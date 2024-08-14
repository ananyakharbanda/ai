import os
import logging
import uuid
import base64
import requests
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

# Initialize Flask app
app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = '/tmp'  # Change this to your desired upload folder
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# OpenAI API configuration using environment variables
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')  # Replace with your environment variable name

if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key must be set in environment variables.")

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set up logging
logging.basicConfig(level=logging.INFO)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Generate a unique filename
def generate_unique_filename(filename):
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    return unique_filename

# Function to encode the image in base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Route to handle file uploads and OpenAI API analysis
@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the request has a file part
        if 'file' not in request.files:
            return "No file part in the request", 400

        file = request.files['file']

        # If no file is selected, return an error
        if file.filename == '':
            return "No file selected", 400

        # Save the file if it has an allowed extension
        if file and allowed_file(file.filename):
            original_filename = secure_filename(file.filename)
            unique_filename = generate_unique_filename(original_filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(file_path)

            # Encode the image in base64
            base64_image = encode_image(file_path)

            # Prepare the request to the OpenAI API
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {OPENAI_API_KEY}"
            }

            payload = {
                "model": "gpt-4o-mini",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "Find the main food item in this image and give the recipe of that, ignore everything else in the image"
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 300
            }

            # Make the API request
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

            # Process the response
            if response.status_code == 200:
                result = response.json()
                app.logger.info(f"Returning JSON response: {result}")
                return jsonify(result), 200
            else:
                app.logger.error(f"OpenAI API error: {response.text}")
                return f"OpenAI API error: {response.text}", response.status_code

        return "Invalid file type", 400

    except Exception as e:
        # Log the error for debugging purposes
        app.logger.error(f"An error occurred: {str(e)}")
        return "An internal error occurred. Please try again later.", 500

# Main entry point
if __name__ == '__main__':
    app.run(host='192.168.1.7', port=44444, debug=True)
