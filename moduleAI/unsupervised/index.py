import cv2
import face_recognition
import os
import numpy as np
import requests
import time

# Step 1: Load images for facial recognition from a designated folder
path = os.path.join(os.path.dirname(__file__), 'userData')
images = [] # Store images
classNames = [] # Store class names
myList = os.listdir(path) # Get list of files in the directory
print("List of images to be recognized: ", myList)
for cl in myList:
    print("Current image: ", cl)
    curImg = cv2.imread(f"{path}/{cl}")  # Read image
    images.append(curImg) # Add image to list
    classNames.append(os.path.splitext(cl)[0]) # Add name of image to class names list

print("Number of images loaded: ", len(images))
print("Class names: ", classNames)

# Step 2: Encoding
def encode_images(images):
    encodeList = [] # Store encodings
    for img in images:
        # Convert BGR to RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0] # Encode face and store in encode
        encodeList.append(encode)
    return encodeList

encodeListKnown = encode_images(images) # Store list of encodings of known faces
print("Encoding successful")
print("Number of encodings: ", len(encodeListKnown))

# Step 3: Initialize webcam
cap = cv2.VideoCapture(0)
flat = False
res = "Unknown"
start_time = time.time()

while True:
    ret, frame = cap.read() # Read frame from webcam
    framS = cv2.resize(frame, (0, 0), None, fx=0.5, fy=0.5) # Resize frame to increase processing speed
    framS = cv2.cvtColor(framS, cv2.COLOR_BGR2RGB) # Convert BGR to RGB

    # Identify facial locations on the webcam and encode the image
    facecurFrame = face_recognition.face_locations(framS) # Find facial locations on image
    encodecurFrame = face_recognition.face_encodings(framS) # Encode faces on image

    # Iterate through each face and its location
    for encodeFace, faceLoc in zip(encodecurFrame, facecurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace) # Compare faces in image with known faces
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace) # Compute distance between faces
        print(faceDis)
        matchIndex = np.argmin(faceDis)  # Get index of face with smallest distance

        if faceDis[matchIndex] < 0.50:
            name = classNames[matchIndex] # Get name of class corresponding to face
        else:
            name = "Unknown"

        # Draw a rectangle around the face and print the name on the frame
        y1, x2, y2, x1 = faceLoc
        y1, x2, y2, x1 = y1*2, x2*2, y2*2, x1*2 # Resize frame to match original frame size
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2) # Draw a rectangle around the face
        cv2.putText(frame, name, (x2, y2),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2) # Print the name on the frame

        # Send information to server and close window
        if name != "Unknown":
            flat = True
            res = name 
            break
            
    # Display the resulting image
    if flat:   
        cv2.imshow('Face recognition', frame)
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
        cv2.imshow('Face recognition', frame)
    
    # Exit the program when 'q' is pressed or if res is not found within 3 seconds
    if cv2.waitKey(1) == ord("q") or flat == True or time.time() - start_time > 3:
        break
    
if res == "Unknown":
    print("Unable to find res within 3 seconds")
else:
    time.sleep(2)
    url = "https://dhabackend.onrender.com/newRecognition"
    data = {"name": res, "status": 1}
    requests.post(url, data=data)

cap.release()  
cv2.destroyAllWindows()


