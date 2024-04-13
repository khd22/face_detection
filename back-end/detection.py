import cv2
import os
from deepface import DeepFace
class Detection:
    

    @staticmethod
    def detect_faces(image_path):
        print("In detect_faces")
        image = cv2.imread(image_path)
        print("image is loadedd2")
        result = DeepFace.analyze(image, actions=['age', 'gender'])
        for i, face_info in enumerate(result):
            x, y, w, h = face_info["region"]["x"], face_info["region"]["y"], face_info["region"]["w"], face_info["region"]["h"]

            # Draw bounding box around detected face
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 3)

            # Extract age and gender predictions
            age = face_info["age"]
            gender = face_info["dominant_gender"]
            text = f"Age: {age}, Gender: {gender}"

            # Display the predicted age and gender on the bounding box
            cv2.putText(image, text, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (36, 255, 12), 3)
            
        
            # Get the directory of the input image
        directory = os.path.dirname(image_path)
        
        # Construct the path for the saved image in the same directory
        output_image_path = os.path.join(directory, "result.jpg")

        # Save the resulted image
        cv2.imwrite(output_image_path, image)

        # Return the path to the saved image
        return output_image_path
