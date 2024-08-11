from flask import Flask, request, redirect, url_for, flash
import os
from werkzeug.utils import secure_filename

# Initialize Flask app
app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = '/tmp'  # Change this to your desired upload folder
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 50 MB limit

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the request has a file part
        if 'file' not in request.files:
            flash('No file part')
            return "No file part in the request", 400

        file = request.files['file']

        # If no file is selected, return an error
        if file.filename == '':
            flash('No selected file')
            return "No file selected", 400

        # Save the file if it has an allowed extension
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            return f"File '{filename}' uploaded successfully!", 200

        return "Invalid file type", 400

    except Exception as e:
        # Log the error for debugging purposes (in production, you'd log this to a file or monitoring system)
        app.logger.error(f"An error occurred: {str(e)}")
        # Return a generic error message to the client
        return "An internal error occurred. Please try again later.", 500

# Main entry point
if __name__ == '__main__':
    app.run(host='192.168.1.7', port=44444, debug=True)

