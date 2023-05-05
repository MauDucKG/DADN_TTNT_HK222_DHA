import cv2
import tensorflow as tf
import numpy as np
import os
import requests
import time

# Connect Adafruit
import random
import time
import sys
from Adafruit_IO import MQTTClient
from dotenv import load_dotenv

AIO_FEED_ID = "detect-raw"
ADAFRUIT_IO_USERNAME = "minhduco19"
ADAFRUIT_IO_KEY = "aio_fZSE33xOwNlN3MtYt1XWDcrHr6WJ"


def connected(client):
    print("Ket noi thanh cong ...")
    # for i in AIO_FEED_ID:
    client.subscribe(AIO_FEED_ID)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)

client = MQTTClient(ADAFRUIT_IO_USERNAME , ADAFRUIT_IO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

# Initialize camera and face detection classifier
camera = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_frontalface_default.xml')

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), 'model.h5')
save_model = tf.keras.models.load_model(model_path)

# Set font for displaying text on image
fontface = cv2.FONT_HERSHEY_SIMPLEX

# Continuously capture frames from camera and detect faces
flat = False
res = "Unknown"
start_time = time.time()

while True:
    ret, image = camera.read()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    fa = face_cascade.detectMultiScale(gray, 1.1, 5)
    
    # For each detected face, predict the name of the person
    for (x, y, w, h) in fa:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_gray = cv2.resize(src=roi_gray, dsize=(100,100))
        roi_gray = roi_gray.reshape((100,100,1))
        roi_gray = np.array(roi_gray)
        result = save_model.predict(np.array([roi_gray]))
        final = np.argmax(result)
        
        # Get the name of the person from the dataset folder
        predata_folder = os.path.join(os.path.dirname(__file__), 'dataset')
        name = os.listdir(predata_folder)[final]
        
        # If the prediction confidence is low, label the person as "Unknown"
        if result[0][final] < 0.5:
            name = "Unknown"

        if name != "Unknown":
            flat = True
            res = name 

        cv2.putText(image, name,(x+10,y+h+ 30), fontface, 1, (0,255,0),2)
        cv2.imshow('Face recognition', image)
    
    # Exit the loop if 'q' is pressed
    if cv2.waitKey(1) == ord("q"):
        break

if res == "Unknown":
    print("Unable to find res within 3 seconds")
    print("Cap nhat")
    client.publish(AIO_FEED_ID, f'{res};0')
else:
    time.sleep(2)
    url = "https://dhabackend.onrender.com/newRecognition"
    data = {"name": res, "status": 1}
    requests.post(url, data=data)
    print("Cap nhat")
    client.publish(AIO_FEED_ID, f'{res};1')

# Release the camera and close all windows
camera.release()
cv2.destroyAllWindows()

