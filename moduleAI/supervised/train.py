# Import necessary libraries
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

# Initialize empty lists for data and labels
data = []
label = []

# Set path to dataset folder
predata_folder = os.path.join(os.path.dirname(__file__), 'dataset')

# Count number of subfolders in dataset folder
num_subfolders = len(os.listdir(predata_folder))

# Loop through each subfolder and each image in each subfolder
for i in range(1, num_subfolders + 1):
    name = os.listdir(predata_folder)[i-1]
    for j in range(1, 17):
        filename = os.path.join(predata_folder, name, f'{j}.jpg')
        Img = cv2.imread(filename)
        Img = cv2.cvtColor(Img, cv2.COLOR_BGR2GRAY)
        Img = cv2.resize(src=Img, dsize=(100, 100))
        Img = np.array(Img)
        data.append(Img)
        label.append(i-1)

# Convert data and label lists to numpy arrays
data1 = np.array(data)
label = np.array(label)

# Reshape data array to have 4 dimensions
data1 = data1.reshape((len(data), 100, 100, 1))

# Normalize data by dividing by 255
X_train = data1/255

# Convert labels to one-hot encoded vectors
lb = LabelBinarizer()
trainY = lb.fit_transform(label)

# Define model architecture
# Model = Sequential()
# shape = (100, 100, 1)
# Model.add(Conv2D(32, (3, 3), padding="same", input_shape=shape))
# Model.add(Activation("relu"))
# Model.add(Conv2D(32, (3, 3), padding="same"))
# Model.add(Activation("relu"))
# Model.add(MaxPooling2D(pool_size=(2, 2)))
# Model.add(Conv2D(64, (3, 3), padding="same"))
# Model.add(Activation("relu"))
# Model.add(MaxPooling2D(pool_size=(2, 2)))
# Model.add(Flatten())
# Model.add(Dense(512))
# Model.add(Activation("relu"))
# Model.add(Dense(num_subfolders))
# Model.add(Activation("softmax"))
model = Sequential()

model.add(Conv2D(6, kernel_size=(5, 5), activation='relu', input_shape=(100, 100, 1)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(16, kernel_size=(5, 5), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(120, activation='relu'))
model.add(Dense(84, activation='relu'))
model.add(Dense(num_subfolders, activation='sigmoid'))

# Print model summary
model.summary()

# Compile model with categorical crossentropy loss, adam optimizer, and accuracy metric
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

# Train model on training data
print("start training")
model.fit(X_train, trainY, batch_size=5, epochs=10)

# Add testing on test set
# Set path to test dataset folder
test_folder = os.path.join(os.path.dirname(__file__), 'dataset')

# Count number of subfolders in test dataset folder
num_subfolders = len(os.listdir(test_folder))

# Initialize empty lists for test data and labels
test_data = []
test_label = []

# Loop through each subfolder and each image in each subfolder
for i in range(1, num_subfolders + 1):
    name = os.listdir(test_folder)[i-1]
    for j in range(18, 20):
        filename = os.path.join(test_folder, name, f'{j}.jpg')
        Img = cv2.imread(filename)
        Img = cv2.cvtColor(Img, cv2.COLOR_BGR2GRAY)
        Img = cv2.resize(src=Img, dsize=(100, 100))
        Img = np.array(Img)
        test_data.append(Img)
        test_label.append(i-1)

# Convert test data and label lists to numpy arrays
test_data = np.array(test_data)
test_label = np.array(test_label)

# Reshape test data array to have 4 dimensions
test_data = test_data.reshape((len(test_data), 100, 100, 1))

# Normalize test data by dividing by 255
testX = test_data/255

# Convert test labels to one-hot encoded vectors
testY = lb.fit_transform(test_label)

# Evaluate model on test data
test_loss, test_acc = model.evaluate(testX, testY)
print(f'Test accuracy: {test_acc}')

# Save model
model.save(os.path.join(os.path.dirname(__file__), 'model.h5'))


