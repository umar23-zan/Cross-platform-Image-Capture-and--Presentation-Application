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
