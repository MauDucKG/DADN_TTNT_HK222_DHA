import cv2
import os
import numpy as np
detector = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def load_images():
    predata_folder = './predata'
    num_subfolders = len(os.listdir(predata_folder))
    for i in range(1, num_subfolders + 1):
        name = os.listdir(predata_folder)[i-1]
        for j in range(1, 20):
            filename = f'{predata_folder}/{name}/{j}.jpg'
            print(filename)
            frame = cv2.imread(filename)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            fa = detector.detectMultiScale(gray, 1.1, 5)
            for (x, y, w, h) in fa:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                if not os.path.exists('./dataset'):
                    os.makedirs('./dataset')
                if not os.path.exists('./dataset/' + name):
                    os.makedirs('./dataset/' + name)
                cv2.imwrite('./dataset/' + name + '/' +
                            str(j)+'.jpg', gray[y:y+h, x:x+w])


def capture_images(name):
    cap = cv2.VideoCapture(0)
    detector = cv2.CascadeClassifier(
        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    sampleNum = 0
    prev_faces = []
    while (True):
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        fa = detector.detectMultiScale(gray, 1.1, 5)
        for (x, y, w, h) in fa:
            is_unique = True
            for (prev_x, prev_y, prev_w, prev_h) in prev_faces:
                if abs(x - prev_x) < 5 and abs(y - prev_y) < 5:
                    is_unique = False
                    print("Please adjust your face angle")
                    break
            if is_unique:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                if not os.path.exists('./dataset'):
                    os.makedirs('./dataset')
                if not os.path.exists('./dataset/' + name):
                    os.makedirs('./dataset/' + name)
                sampleNum += 1
                cv2.imwrite('./dataset/' + name + '/' +
                            str(sampleNum)+'.jpg', gray[y:y+h, x:x+w])
                prev_faces.append((x, y, w, h))
        if sampleNum > 20:
            break
    cap.release()
    cv2.destroyAllWindows()



id = input("Enter 1 to capture images or 2 to load images: ")

if id == '1':
    name = input("Enter your name: ")
    capture_images(name)
elif id == '2':
    load_images()
else:
    print("Invalid input!")
