document.addEventListener('DOMContentLoaded', () => {
  const urlForm = document.getElementById('urlForm');
  const alertMessage = document.getElementById('alertMessage');
  const reportUrlForm = document.getElementById('reportUrlForm');

  // Load blacklist data
  let blacklist = [];
  fetch('data/blacklist.json')
    .then(response => response.json())
    .then(data => {
      blacklist = data.urls;
    });

  // Check URL against blacklist
  urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;
    if (isBlacklisted(url)) {
      showAlert('Warning: This URL is on the blacklist!');
    } else {
      const isPhishing = await checkURL(url);
      if (isPhishing) {
        showAlert('Warning: This URL may be a phishing site!');
      } else {
        showAlert('This URL appears to be safe.');
      }
    }
  });

  // Report phishing site
  reportUrlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reportUrl = document.getElementById('reportUrl').value;
    const description = document.getElementById('reportDescription').value;
    submitReport(reportUrl, description);
  });

  function showAlert(message) {
    alertMessage.textContent = message;
  }

  function isBlacklisted(url) {
    return blacklist.some(domain => url.includes(domain));
  }

  async function checkURL(url) {
    try {
      // Replace with actual API endpoint
      const response = await fetch(`https://phishing-api.example.com/check?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      return data.isPhishing;
    } catch (error) {
      console.error('Error checking URL:', error);
      return false;
    }
  }

  function submitReport(url, description) {
    // Send report to server (placeholder URL)
    fetch('https://your-server.example.com/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, description })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Report submitted successfully!');
      } else {
        alert('Failed to submit report.');
      }
    })
    .catch(error => {
      console.error('Error submitting report:', error);
      alert('Error submitting report.');
    });
  }
});
