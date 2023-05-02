from tensorflow.keras.optimizers import SGD
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import concatenate
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Input
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Activation
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import Model
from sklearn.preprocessing import LabelBinarizer
import os
import cv2
import numpy as np
from PIL import Image
data = []
label = []

predata_folder = './dataset'
num_subfolders = len(os.listdir(predata_folder))
data = []
label = []
for i in range(1, num_subfolders + 1):
    name = os.listdir(predata_folder)[i-1]
    for j in range(1, 16):
        filename = f'{predata_folder}/{name}/{j}.jpg'
        Img = cv2.imread(filename)
        Img = cv2.cvtColor(Img, cv2.COLOR_BGR2GRAY)
        Img = cv2.resize(src=Img, dsize=(100, 100))
        Img = np.array(Img)
        data.append(Img)
        label.append(i-1)
data1 = np.array(data)
label = np.array(label)
data1 = data1.reshape((len(data), 100, 100, 1))

X_train = data1/255
lb = LabelBinarizer()
trainY = lb.fit_transform(label)
Model = Sequential()
shape = (100, 100, 1)
Model.add(Conv2D(32, (3, 3), padding="same", input_shape=shape))
Model.add(Activation("relu"))
Model.add(Conv2D(32, (3, 3), padding="same"))
Model.add(Activation("relu"))
Model.add(MaxPooling2D(pool_size=(2, 2)))
Model.add(Conv2D(64, (3, 3), padding="same"))
Model.add(Activation("relu"))
Model.add(MaxPooling2D(pool_size=(2, 2)))
Model.add(Flatten())
Model.add(Dense(512))
Model.add(Activation("relu"))
Model.add(Dense(num_subfolders))
Model.add(Activation("softmax"))
Model.summary()
Model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
print("start training")
Model.fit(X_train, trainY, batch_size=5, epochs=5)

# Add testing on test set
test_folder = './dataset'
num_subfolders = len(os.listdir(test_folder))
test_data = []
test_label = []
for i in range(1, num_subfolders + 1):
    name = os.listdir(test_folder)[i-1]
    for j in range(17, 20):
        filename = f'{test_folder}/{name}/{j}.jpg'
        Img = cv2.imread(filename)
        Img = cv2.cvtColor(Img, cv2.COLOR_BGR2GRAY)
        Img = cv2.resize(src=Img, dsize=(100, 100))
        Img = np.array(Img)
        test_data.append(Img)
        test_label.append(i-1)
test_data = np.array(test_data)
test_label = np.array(test_label)
test_data = test_data.reshape((len(test_data), 100, 100, 1))
testX = test_data/255
testY = lb.fit_transform(test_label)
test_loss, test_acc = Model.evaluate(testX, testY)
print(f'Test accuracy: {test_acc}')

Model.save("khuonmat.h5")

