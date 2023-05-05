# Import necessary libraries
import cv2
import os
import numpy as np

# Load the face detector
detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def load_images():
    # Define the folder containing the predata
    predata_folder = os.path.join(os.path.dirname(__file__), 'predata')
    # Count the number of subfolders in the predata folder
    num_subfolders = len(os.listdir(predata_folder))
    # Loop through each subfolder
    for i in range(1, num_subfolders + 1):
        # Get the name of the subfolder
        name = os.listdir(predata_folder)[i-1]
        # Loop through each image in the subfolder
        for j in range(1, 20):
            # Define the filename of the image
            filename = f'{predata_folder}/{name}/{j}.jpg'
            # Load the image
            frame = cv2.imread(filename)
            # Convert the image to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # Detect faces in the image
            fa = detector.detectMultiScale(gray, 1.1, 5)
            # Loop through each face in the image
            for (x, y, w, h) in fa:
                # Draw a rectangle around the face
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                # Create the dataset folder if it does not exist
                if not os.path.exists(os.path.join(os.path.dirname(__file__), 'dataset')):
                    os.makedirs(os.path.join(os.path.dirname(__file__), 'dataset'))
                # Create the folder for the current person if it does not exist
                if not os.path.exists(os.path.join(os.path.dirname(__file__), 'dataset', name)):
                    os.makedirs(os.path.join(os.path.dirname(__file__), 'dataset', name))
                # Save the face to the dataset folder
                cv2.imwrite(os.path.join(os.path.dirname(__file__), 'dataset', name, str(j)+'.jpg'), gray[y:y+h, x:x+w])


def capture_images(name):
    # Open the default camera
    cap = cv2.VideoCapture(0)
    # Load the face detector
    detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    # Initialize the sample number
    sampleNum = 0
    # Initialize the list of previous faces
    prev_faces = []
    while (True):
        # Capture a frame from the camera
        ret, frame = cap.read()
        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Detect faces in the frame
        fa = detector.detectMultiScale(gray, 1.1, 5)
        # Loop through each face in the frame
        for (x, y, w, h) in fa:
            # Check if the face is unique
            is_unique = True
            for (prev_x, prev_y, prev_w, prev_h) in prev_faces:
                if abs(x - prev_x) < 5 and abs(y - prev_y) < 5:
                    is_unique = False
                    # Print a message if the face is not unique
                    print("Please adjust your face angle")
                    break
            # If the face is unique, save it to the dataset folder
            if is_unique:
                # Draw a rectangle around the face
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                # Create the dataset folder if it does not exist
                if not os.path.exists(os.path.join(os.path.dirname(__file__), 'dataset')):
                    os.makedirs(os.path.join(os.path.dirname(__file__), 'dataset'))
                # Create the folder for the current person if it does not exist
                if not os.path.exists(os.path.join(os.path.dirname(__file__), 'dataset', name)):
                    os.makedirs(os.path.join(os.path.dirname(__file__), 'dataset', name))
                # Increment the sample number
                sampleNum += 1
                # Save the face to the dataset folder
                cv2.imwrite(os.path.join(os.path.dirname(__file__), 'dataset', name, str(sampleNum)+'.jpg'), gray[y:y+h, x:x+w])
                # Add the face to the list of previous faces
                prev_faces.append((x, y, w, h))
        # If enough samples have been taken, exit the loop
        if sampleNum > 20:
            break

    # Release the camera and destroy all windows
    cap.release()
    cv2.destroyAllWindows()

# Prompt the user to choose between capturing images and loading images
id = input("Enter 1 to capture images or 2 to load images: ")

# If the user chooses to capture images, prompt them to enter their name and capture images
if id == '1':
    name = input("Enter your name: ")
    capture_images(name)
# If the user chooses to load images, load the images
elif id == '2':
    load_images()
# If the user enters an invalid input, print an error message
else:
    print("Invalid input!")
