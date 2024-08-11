import os
import logging
import uuid
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import HttpResponseError


# Initialize Flask app
app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = '/tmp'  # Change this to your desired upload folder
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Azure AI Vision configuration using environment variables
AZURE_ENDPOINT = os.getenv('AZURE_ENDPOINT')  # Replace with your environment variable name
AZURE_API_KEY = os.getenv('AZURE_API_KEY')    # Replace with your environment variable name

if not AZURE_ENDPOINT or not AZURE_API_KEY:
    raise ValueError("Azure endpoint and API key must be set in environment variables.")

# Initialize the Image Analysis client
image_analysis_client = ImageAnalysisClient(endpoint=AZURE_ENDPOINT, credential=AzureKeyCredential(AZURE_API_KEY))

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

# Route to handle file uploads and Azure AI Vision analysis
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

            # Analyze the image using Azure AI Vision
            with open(file_path, "rb") as image_stream:
                try:
                    # Get result with specified features to be 
                    # Get result with specified features to be retrieved
                    analysis_result = image_analysis_client.analyze(
                        image_data=image_stream.read(),
                        visual_features=[VisualFeatures.CAPTION,
                VisualFeatures.TAGS,
                VisualFeatures.OBJECTS,
                VisualFeatures.PEOPLE])

                except HttpResponseError as e:
                    print(f"Status code: {e.status_code}")
                    print(f"Reason: {e.reason}")
                    print(f"Message: {e.error.message}")


            # Identify the main object in the image
            if analysis_result.objects:
                for detected_object in analysis_result.objects.list:
                    # Print object name
                    print(" {} (confidence: {:.2f}%)".format(detected_object.tags[0].name, detected_object.tags[0].confidence * 100))
                # Log the JSON response
                #app.logger.info(f"Returning JSON response: {response_data}")
                #return jsonify(response_data), 200
                return ''
            else:
                #response_data = {"message": "No objects detected in the image."}
                # Log the JSON response
                #app.logger.info(f"Returning JSON response: {response_data}")
                #return jsonify(response_data), 200
                return ''

        return "Invalid file type", 400

    except Exception as e:
        # Log the error for debugging purposes
        app.logger.error(f"An error occurred: {str(e)}")
        return "An internal error occurred. Please try again later.", 500


# Main entry point
if __name__ == '__main__':
    app.run(host='192.168.1.7', port=44444, debug=True)

