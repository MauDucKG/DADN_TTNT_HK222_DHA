import cv2
import tensorflow as tf
import numpy as np
import os
import requests
import time

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
            break

        # Display the name of the person on the image
    if flat:   
        cv2.imshow('Face recognition', image)
        img = np.zeros((200, 500, 3), np.uint8) # Create a black image
        img[:] = (255, 255, 255) # Fill the image with white
        font = cv2.FONT_HERSHEY_SIMPLEX # Set font
        text = res # Set text
        textsize = cv2.getTextSize(text, font, 1, 2)[0] # Get size of text
        textX = int((img.shape[1] - textsize[0]) / 2) # Calculate x-coordinate of text
        textY = int((img.shape[0] + textsize[1]) / 2) # Calculate y-coordinate of text
        cv2.putText(img, text, (textX, textY), font, 1, (255, 0, 0), 2) # Add text to image
        cv2.imshow('Name', img) # Display image
    else:
        cv2.imshow('Face recognition', image)
    
    # Exit the loop if 'q' is pressed
    if cv2.waitKey(1) == ord("q") or flat == True or time.time() - start_time > 3:
        break

if res == "Unknown":
    print("Unable to find res within 3 seconds")
else:
    time.sleep(2)
    url = "https://dhabackend.onrender.com/newRecognition"
    data = {"name": res, "status": 1}
    requests.post(url, data=data)

# Release the camera and close all windows
camera.release()
cv2.destroyAllWindows()

