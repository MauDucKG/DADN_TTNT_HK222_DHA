from PIL import Image
import numpy as np
import cv2
import pickle
import requests
from tensorflow.keras.models import load_model

# Connect Adafruit
import random
import time
import sys
from Adafruit_IO import MQTTClient
from dotenv import load_dotenv

AIO_FEED_ID = "detect-raw"
ADAFRUIT_IO_USERNAME = "minhduco19"
ADAFRUIT_IO_KEY = "aio_ZSgw77S49MvARxR1AKGdywiukUVq"


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

# for face detection
face_cascade = cv2.CascadeClassifier('./Model & Labels/haarcascade_frontalface_default.xml')

# resolution of the webcam
screen_width = 1280      # try 640 if code fails
screen_height = 720

# size of the image to predict
image_width = 224
image_height = 224

# load the trained model
model = load_model('./Model & Labels/face_rec.h5', compile = False)

# the labels for the trained model
with open("./Model & Labels/face-labels.pickle", 'rb') as f:
    og_labels = pickle.load(f)
    labels = {key:value for key,value in og_labels.items()}
    print(labels)

# default webcam
stream = cv2.VideoCapture(0)

# Continuously capture frames from camera and detect faces
flat = False
res = "Unknown"
start_time = time.time()

name = ""

while(True):
    # Capture frame-by-frame
    (grabbed, frame) = stream.read()
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # try to detect faces in the webcam
    faces = face_cascade.detectMultiScale(rgb, scaleFactor=1.3, minNeighbors=5)

    # for each faces found
    for (x, y, w, h) in faces: 
        roi_rgb = rgb[y:y+h, x:x+w]

        # Draw a rectangle around the face
        color = (255, 0, 0) # in BGR
        stroke = 2
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, stroke)

        # resize the image
        size = (image_width, image_height)
        resized_image = cv2.resize(roi_rgb, size)
        image_array = np.array(resized_image, "uint8")
        img = image_array.reshape(1,image_width,image_height,3) 
        img = img.astype('float32')
        img /= 255

        # predict the image
        predicted_prob = model.predict(img)

        # Display the label
        font = cv2.FONT_HERSHEY_SIMPLEX
        if predicted_prob[0].max() > 0.9:
            name = labels[predicted_prob[0].argmax()]
            print(name)
            disp = name + f'({predicted_prob[0][predicted_prob[0].argmax()]})'
            res = labels[predicted_prob[0].argmax()] + ';1'
        else:
            name = "Unknown"
            print(name)
            disp = name + f'({predicted_prob[0][predicted_prob[0].argmax()]})'
            res = "Unknown;0"
        color = (255, 0, 255)
        stroke = 2
        # cv2.putText(frame, f'({name})', (x,y-8),
        #     font, 1, color, stroke, cv2.LINE_AA)

    # Show the frame
    cv2.imshow("Image", frame)
    # Exit the loop if 'q' is pressed
    if cv2.waitKey(1) == ord("q") or time.time() - start_time > 5:
        break

print(name)
if name == "Unknown":
    print("Unable to find res within 5 seconds")
    print("Cap nhat k oke")
    client.publish(AIO_FEED_ID, f'{res}')
else:
    time.sleep(2)
    url = "https://dhabackend.onrender.com/newRecognition"
    data = {"name": name, "status": 1}
    # requests.post(url, data=data)
    print("Cap nhat oke")
    client.publish(AIO_FEED_ID, f'{res}')

# Cleanup
stream.release()
cv2.waitKey(1)
cv2.destroyAllWindows()
cv2.waitKey(1)
