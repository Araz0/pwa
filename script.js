// Define the recommended threshold for daily social media usage in minutes
const recommendedThreshold = 120; // 1-2 hours
document.getElementById("calculate-btn").addEventListener("click", function () {
  // Get the values of each input field
  const instagramTime = parseInt(document.getElementById("instagram").value || 0);
  const youtubeTime = parseInt(document.getElementById("youtube").value || 0);
  const tiktokTime = parseInt(document.getElementById("tiktok").value || 0);
  const berealTime = parseInt(document.getElementById("bereal").value || 0);
  const facebookTime = parseInt(document.getElementById("facebook").value || 0);
  const whatsappTime = parseInt(document.getElementById("whatsapp").value || 0);

  // sum all values together
  const totalTimeSpent = instagramTime + youtubeTime + tiktokTime + berealTime + facebookTime + whatsappTime;

  // Compare the total time spent with the recommended threshold
  const percentageThreshold = (totalTimeSpent/ recommendedThreshold) * 100;

  // Generate the detox recommendation
  let detoxRecommendation = "";
  if (totalTimeSpent > recommendedThreshold) {
    detoxRecommendation = "Consider taking a social media detox.";
    if (percentageThreshold >= 50) {
      detoxRecommendation += " Try taking a one-week break from social media every month.";
    }
  } else {
    detoxRecommendation = "Your social media usage is within healthy limits.";
  }

  // Display the detox recommendation
  document.getElementById("result").textContent = detoxRecommendation;

  // // Log the values to the console
  // console.log("Instagram Time:", instagramTime);
  // console.log("YouTube Time:", youtubeTime);
  // console.log("TikTok Time:", tiktokTime);
  // console.log("BeReal Time:", berealTime);
  // console.log("Facebook Time:", facebookTime);
  // console.log("WhatsApp Time:", whatsappTime);
  // console.log("Total Time:", totalTime);

});

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}

// Installation - Defer Installation Prompt and initiate with a button
let deferredPrompt;
let installButton = document.getElementById('install-button');
let pushButton = document.getElementById('push-button');

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'block';
});

installButton.addEventListener('click', function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log('User ' + choiceResult.outcome);
      deferredPrompt = null;
      installButton.style.display = 'none';
    });
  }
});

pushButton.addEventListener('click', function() {
  if (!('Notification' in window)) {
    console.error('This browser does not support system notifications');
    return;
  }

  if (Notification.permission === 'denied') {
    console.warn('Notification permission is denied');
    return;
  }

  Notification.requestPermission()
    .then(function(permission) {
      console.log('Notification permission: ' + permission);
      if (permission === 'granted') {
        showPushMessage('Thank you for enabling push notifications!');
      } else {
        console.warn('Notification permission denied');
      }
    });
});

function showPushMessage(message) {
  navigator.serviceWorker.ready
    .then(function(registration) {
      registration.showNotification('Social Media Analyzer', {
        body: message,
        icon: 'icon.png'
      });
    });
}
