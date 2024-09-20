
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const feedback = document.getElementById('feedback');

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    feedback.textContent = 'Error accessing camera: ' + err.message;
  });

captureBtn.addEventListener('click', () => {
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  sessionStorage.setItem('capturedImage', imageData);

  feedback.textContent = 'Image captured successfully! Redirecting...';

  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());

  setTimeout(() => {
    window.location.href = 'display.html';
  }, 1000);
});
