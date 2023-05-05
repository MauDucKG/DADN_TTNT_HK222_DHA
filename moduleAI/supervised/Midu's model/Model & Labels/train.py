import cv2
import os
import pickle
import pandas as pd
import numpy as np
import tensorflow.keras as keras
from PIL import Image

import matplotlib.pyplot as plt

from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet import preprocess_input

from tensorflow.keras.preprocessing.image import ImageDataGenerator

from tensorflow.keras.models import Model

from tensorflow.keras.optimizers import Adam

from keras_vggface.vggface import VGGFace

headshots_folder_name = 'dataset'

# dimension of images
image_width = 224
image_height = 224

# for detecting faces
facecascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# set the directory containing the images
images_dir = os.path.join("..", headshots_folder_name)

current_id = 0
label_ids = {}

# iterates through all the files in each subdirectories
for root, _, files in os.walk(images_dir):
    for file in files:
        if file.endswith("png") or file.endswith("jpg") or file.endswith("jpeg"):
          # path of the image
          path = os.path.join(root, file)

          # get the label name (name of the person)
          label = os.path.basename(root).replace(" ", ".").lower()

          # add the label (key) and its number (value)
          if not label in label_ids:
              label_ids[label] = current_id
              current_id += 1

          # load the image
          imgtest = cv2.imread(path, cv2.IMREAD_COLOR)
          image_array = np.array(imgtest, "uint8")

          # get the faces detected in the image
          faces = facecascade.detectMultiScale(imgtest, scaleFactor=1.1, minNeighbors=5)

          # if not exactly 1 face is detected, skip this photo
          # if len(faces) != 1:
          #     print(f'---Photo skipped---\n')
          # # remove the original image
          # os.remove(path)
          # continue

          # save the detected face(s) and associate
          # them with the label
          for (x_, y_, w, h) in faces:

              # draw the face detected
              face_detect = cv2.rectangle(imgtest,
                      (x_, y_),
                      (x_+w, y_+h),
                      (255, 0, 255), 2)

              # resize the detected face to 224x224
              size = (image_width, image_height)

              # detected face region
              roi = image_array[y_: y_ + h, x_: x_ + w]

              # resize the detected head to target size
              resized_image = cv2.resize(roi, size)
              image_array = np.array(resized_image, "uint8")

              # remove the original image
              os.remove(path)

              # replace the image with only the face
              im = Image.fromarray(image_array)
              im.save(path)

train_datagen = ImageDataGenerator(preprocessing_function=preprocess_input,rotation_range=10,   # Rotate the image by up to 10 degrees
    width_shift_range=0.1,   # Shift the image horizontally by up to 10% of the image width
    height_shift_range=0.1,   # Shift the image vertically by up to 10% of the image height
    horizontal_flip=True,   # Flip the image horizontally
    zoom_range=0.1,   # Zoom the image by up to 10%
    fill_mode='nearest'   # Fill any empty pixels with the nearest pixel
)

train_generator = train_datagen.flow_from_directory(images_dir, target_size=(224,224), color_mode='rgb', batch_size=32, class_mode='categorical', shuffle=True)

NO_CLASSES = len(train_generator.class_indices.values())

base_model = VGGFace(include_top=False,
    model='vgg16',
    input_shape=(224, 224, 3))

x = base_model.output
x = GlobalAveragePooling2D()(x)

x = Dense(1024, activation='relu')(x)
x = Dense(1024, activation='relu')(x)
x = Dense(512, activation='relu')(x)

# final layer with softmax activation
preds = Dense(NO_CLASSES, activation='softmax')(x)

model = Model(inputs = base_model.input, outputs = preds)
model.summary()

# don't train the first 19 layers - 0..18
for layer in model.layers[:19]:
    layer.trainable = False

# train the rest of the layers - 19 onwards
for layer in model.layers[19:]:
    layer.trainable = True

model.compile(optimizer='Adam',
    loss='categorical_crossentropy',
    metrics=['accuracy'])

callback = keras.callbacks.EarlyStopping(monitor='loss', patience=3)

model.fit_generator(train_generator, epochs = 10, steps_per_epoch=len(train_generator), callbacks=[callback])

model.save(
    'face_rec.h5')

class_dictionary = train_generator.class_indices
class_dictionary = {
    value:key for key, value in class_dictionary.items()
}
class_dictionary[0] = 'Unknown'
print(class_dictionary)

face_label_filename = 'face-labels.pickle'
with open(face_label_filename, 'wb') as f: pickle.dump(class_dictionary, f)

