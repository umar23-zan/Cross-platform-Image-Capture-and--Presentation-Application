window.onload = function() {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    document.getElementById('displayImage').src = capturedImage;
  } else {
    alert('No image captured! Redirecting to capture page...');
    window.location.href = 'capture.html';
  }
};

document.getElementById('retakeBtn').addEventListener('click', function() {
  window.location.href = 'capture.html';
});