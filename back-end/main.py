from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from detection import Detection
import os
from werkzeug.utils import secure_filename
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
UPLOAD_FOLDER = 'uploads'  # Directory to save uploaded images
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Allowed image file extensions

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "Connection Established"

@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return 'No file uploaded', 400

    file = request.files['image']

    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        file.save(file_path)

        detect = Detection()
        image_reslt = detect.detect_faces(file_path)

        return send_file(image_reslt, as_attachment=True)
    else:
        return 'Unsupported file type. Please upload an image with one of the following extensions: png, jpg, jpeg, gif', 400
# running locally
# if __name__ == "__main__":
#     app.run(debug=True)

#Hosting on Render:
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)