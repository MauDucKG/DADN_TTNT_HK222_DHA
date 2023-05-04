# import the necessary packages
import tensorflow as tf
from keras.applications import MobileNetV2
from keras.layers import AveragePooling2D
from keras.layers import Dropout
from keras.layers import Flatten
from keras.layers import Dense
from keras.layers import Input
from keras.models import Model
from keras.optimizers import Adam
from keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import numpy as np
import os
import cv2
from time import time

predata_folder = os.path.join(os.path.dirname(__file__), 'dataset')
# num_subfolders = len(os.listdir(DIRECTORY))
num_subfolders = len(os.listdir(predata_folder))
data = []
labels = []
img_size = 96;
BATCH_SIZE = 8;

for i in range(1, num_subfolders + 1):
    name = os.listdir(predata_folder)[i-1]
    for j in range(1, 16):
        img_path = os.path.join(predata_folder, name, f'{j}.jpg')
        image = cv2.imread(img_path)
        image = cv2.resize(src=image, dsize=(img_size, img_size))
        image = img_to_array(image)
        image = preprocess_input(image)
        data.append(image)
        labels.append(i-1)
        
lb = LabelBinarizer()
labels = lb.fit_transform(labels)
labels = to_categorical(labels)

data = np.array(data)
labels = np.argmax(labels, axis=1)

# print(labels.shape)
baseModel = MobileNetV2(weights="imagenet", include_top=False, input_tensor=Input(shape=(96, 96, 3)))

for layer in baseModel.layers:
    layer.trainable = False

headModel = baseModel.output
headModel = AveragePooling2D(pool_size=(3, 3))(headModel)
headModel = Flatten(name="flatten")(headModel)
headModel = Dense(128, activation="relu")(headModel)
headModel = Dropout(0.5)(headModel)
headModel = Dense(2, activation="softmax")(headModel)

model = Model(inputs=baseModel.input, outputs=headModel)

lr=2e-4
INIT_LR = 1e-4
EPOCHS = 30
# defining the optimizer for the model
opt = Adam(lr=lr, decay=INIT_LR / EPOCHS)
# compile our model
print("[INFO] compiling model...")
model.compile(loss="categorical_crossentropy", optimizer=opt,metrics=["accuracy"])

start = time()
history= model.fit(data, labels, batch_size=BATCH_SIZE, epochs=15)
print(time()-start)

test_folder = os.path.join(os.path.dirname(__file__), 'dataset')
# num_subfolders = len(os.listdir(DIRECTORY))
test_data = []
test_labels = []
img_size = 96;

for i in range(1, num_subfolders + 1):
    name = os.listdir(predata_folder)[i-1]
    for j in range(17, 20):
        img_path = os.path.join(predata_folder, name, f'{j}.jpg')
        image = cv2.imread(img_path)
        image = cv2.resize(src=image, dsize=(img_size, img_size))
        image = img_to_array(image)
        image = preprocess_input(image)
        test_data.append(image)
        test_labels.append(i-1)
        
lb = LabelBinarizer()
test_labels = lb.fit_transform(test_labels)
test_labels = to_categorical(test_labels)

test_data = np.array(test_data)
test_labels = np.argmax(test_labels, axis=1)

test_loss, test_acc = model.evaluate(test_data, test_labels)
print(f'Test accuracy: {test_acc}')

# Save model
model.save(os.path.join(os.path.dirname(__file__), 'model.h5'))