# Documentation for Mobile Image Capture and Presentation App
## 1. Project Overview
This project is a simple web-based mobile application that allows users to capture a live image using their device's camera and display the captured image on a separate page. The app is designed to be mobile-friendly and responsive, ensuring seamless use on mobile devices such as smartphones and tablets.

## 2. Key Features
Access Camera Directly: Uses the device's camera to capture live images.
Capture and Display: Allows the user to take a picture and then displays it on a separate page.
Responsive Design: Designed with CSS media queries to ensure compatibility across different screen sizes and orientations.
Session Storage: Captured images are stored using session storage, allowing image transfer between pages without reloading.

## 3. Technologies Used
HTML5: For structuring the web pages.
CSS3: For styling and responsive layout design.
JavaScript: For handling camera access, image capture, and image display using HTML5's getUserMedia() API.
MediaDevices API: Provides access to the user's camera for capturing live images.
Session Storage: For storing the captured image temporarily between page transitions.

## 4. How the Application Works

Page 1: Capture Image (capture.html)
This page provides the interface to capture a live image using the device’s camera.

The app uses the MediaDevices API to access the device's camera and stream the live feed in a <video> element.
When the user clicks the "Capture Image" button, a frame from the video feed is captured and drawn onto a hidden <canvas> element.
The image from the canvas is converted into a base64 string and stored in the browser’s session storage.
After capturing the image, the user is redirected to the display page (display.html).

Page 2: Display Captured Image (display.html)
This page displays the image captured on the first page.

It retrieves the base64-encoded image string stored in session storage and displays it in an <img> element.
If no image is available, the app redirects the user back to the capture page.

## 5. File Structure

/project-root
│
├── capture.html        # HTML file for image capture
├── display.html        # HTML file for displaying the captured image
├── styles.css          # CSS file for styling and responsive design
└── capture.js          # JavaScript for capturing and storing the image
└── display.js          # JavaScript for displaying the stored image

## 6. Code Explanation

This page initializes the live video stream and provides the UI for capturing the image.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capture Image</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Capture Image</h1>
    </header>
    <main>
      <!-- Video element for live camera feed -->
      <video id="video" autoplay playsinline></video>

      <!-- Button to capture image from video feed -->
      <button id="captureBtn" class="btn-primary">Capture Image</button>

      <!-- Canvas element to display captured image -->
      <canvas id="canvas" style="display:none;"></canvas>
      <p id="feedback" class="feedback"></p>
    </main>
  </div>

  <script src="capture.js"></script>
</body>
</html>
```
JavaScript for Capturing Image (capture.js)
This script uses the MediaDevices API to stream the camera feed to the <video> element, capture the image when the user clicks the "Capture Image" button, and store the image in session storage.
```
// Access the camera and stream it to the video element
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const feedback = document.getElementById('feedback');

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    feedback.textContent = 'Error accessing camera: ' + err.message;
  });

// Capture the image from the video stream
captureBtn.addEventListener('click', () => {
  // Set the canvas dimensions to match the video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current video frame onto the canvas
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the canvas image to a base64-encoded string and store it in sessionStorage
  const imageData = canvas.toDataURL('image/png');
  sessionStorage.setItem('capturedImage', imageData);

  feedback.textContent = 'Image captured successfully! Redirecting...';

  // Stop the video stream
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());

  // Redirect to the display page after 1 second
  setTimeout(() => {
    window.location.href = 'display.html';
  }, 1000);
});
```
Display Page (display.html)
This page retrieves the image stored in session storage and displays it.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Display Captured Image</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Captured Image</h1>
    </header>
    <main>
      <img id="displayImage" alt="Captured Image" style="max-width:100%; border:1px solid #ddd; border-radius: 5px;">
      <button id="retakeBtn" class="btn-primary">Retake Image</button>
    </main>
  </div>
  <script src="display.js"></script>
</body>
</html>
```
JavaScript for Displaying Image (display.js)
This script retrieves the captured image from session storage and displays it in the <img> element.
```
window.onload = function() {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    document.getElementById('displayImage').src = capturedImage;
  } else {
    alert('No image captured! Redirecting to capture page...');
    window.location.href = 'capture.html';
  }
};
```
7. Styling (styles.css)
This is a simple CSS file to handle the layout and responsiveness of the app.
```
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

video {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.btn-primary {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0a58ca;
}

.feedback {
  margin-top: 20px;
  font-size: 16px;
  color: #6c757d;
}
```
## 8. Instructions for Testing
Open the capture.html file in a mobile browser or an emulator that supports camera access.
Allow the browser to access the camera when prompted.
Capture the live image by clicking the "Capture Image" button.
The image will be saved in session storage, and you'll be redirected to display.html where the image will be displayed.
You can test the app on both mobile devices (Android/iOS) to ensure camera access works properly.

## 9. Conclusion
This documentation covers the technical details and implementation steps required to build a cross-platform web app that allows users to capture and display images using their mobile device's camera. The app is built using modern web technologies like the HTML5 MediaDevices API, JavaScript, and CSS for responsiveness, and is designed to provide a seamless user experience across mobile devices.
