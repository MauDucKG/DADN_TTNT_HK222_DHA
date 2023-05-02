import cv2
import tensorflow as tf
import numpy as np
import os

camera = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_frontalface_default.xml')
save_model = tf.keras.models.load_model("model.h5")
fontface = cv2.FONT_HERSHEY_SIMPLEX

while True:
    ret, image = camera.read()
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    fa = face_cascade.detectMultiScale(gray, 1.1, 5)
    for (x, y, w, h) in fa:
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_gray = cv2.resize(src=roi_gray, dsize=(100,100))
        roi_gray = roi_gray.reshape((100,100,1))
        roi_gray = np.array(roi_gray)
        result = save_model.predict(np.array([roi_gray]))
        final = np.argmax(result)
        predata_folder = './dataset'
        name = os.listdir(predata_folder)[final]
        if result[0][final] < 0.5:
            name = "Unknown"
        cv2.putText(image, name,(x+10,y+h+ 30), fontface, 1, (0,255,0),2)
    cv2.imshow('realtime',image)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
