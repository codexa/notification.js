/* Globals */
var notification = {}, notificationContainer;

/* Init */
window.addEventListener('DOMContentLoaded', function init() {
  notificationContainer = document.createElement('div');
  notificationContainer.classList.add('notification-container');
  document.body.appendChild(notificationContainer);
});

notification.show = function (title, content, icon) {
  // Make sure variables are equal to something...
  if (!title) {
    title = 'Notification';
  }
  if (!content) {
    content = (window.location + ' wants to notify you about something.');
  }
  
  var currentNotification = null;
  if (navigator.mozNotification) {
    // Use built-in notification handler
    currentNotification = navigator.mozNotification.createNotification(title, content, icon);
    currentNotification.show();
  } else {
    // Use polyfill
    currentNotification = notification.create(title, content, icon);
    notificationContainer.appendChild(currentNotification);
    currentNotification.classList.add('shown');
    setTimeout(function () {
      notification.remove(currentNotification);
    }, 5000);
  }
};

notification.create = function (title, content, icon) {
  // Make sure variables are equal to something...
  if (!title) {
    title = 'Notification';
  }
  if (!content) {
    content = (window.location + ' wants to notify you about something.');
  }
  
  // Create notification node
  var tempNode = document.createElement('div');
  var tempNodeImage = document.createElement('img');
  var tempNodeTitle = document.createElement('h3');
  var tempNodeContent = document.createElement('p');
  var tempNodeCloseButton = document.createElement('button');
  tempNodeCloseButton.textContent = 'X';
  tempNodeCloseButton.classList.add('notification-close-button');
  tempNodeImage.src = icon;
  tempNodeTitle.textContent = title;
  tempNodeContent.textContent = content;
  tempNode.appendChild(tempNodeCloseButton);
  tempNode.appendChild(tempNodeImage);
  tempNode.appendChild(tempNodeTitle);
  tempNode.appendChild(tempNodeContent);
  tempNode.classList.add('notification');
  return tempNode;
};

notification.remove = function (node) {
  if (node && node.parentNode) {
    node.classList.remove('shown');
    setTimeout(function () {
      notificationContainer.removeChild(node);
    }, 300);
  }
}

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('notification-close-button')) {
    notification.remove(event.target.parentNode);
  }
});