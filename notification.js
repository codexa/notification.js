/* Globals */
var notification = {}, notificationContainer, notificationCount = 0;

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
    currentNotification.onclose = function() {
      document.title = document.title.replace(/\[[0-9]{1,}\]/i, '');
      if (notificationCount > 0) {
        document.title = ('[' + notificationCount + '] ' + document.title);      
      }      
    };
  } else {
    // Use polyfill
    currentNotification = notification.create(title, content, icon);
    notificationContainer.appendChild(currentNotification);
    currentNotification.classList.add('shown');
    setTimeout(function () {
      notification.remove(currentNotification);
    }, 5000);
  }
  notificationCount = (notificationCount + 1);
  document.title = document.title.replace(/\[[0-9]{1,}\]/i, '');
  document.title = ('[' + notificationCount + '] ' + document.title);
    return currentNotification;
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
  var tempNodeCloseButton = document.createElement('button');
  var tempNodeTitle = document.createElement('h3');
  var tempNodeContent = document.createElement('p');
  if (icon && icon != '' && icon != 0) {
    var tempNodeImage = document.createElement('img');
    tempNodeImage.src = icon;
    tempNode.appendChild(tempNodeImage);
  }
  tempNodeCloseButton.textContent = 'X';
  tempNodeCloseButton.classList.add('notification-close-button');
  tempNodeTitle.textContent = title;
  tempNodeContent.textContent = content;
  tempNode.appendChild(tempNodeCloseButton);
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
      notificationCount = (notificationCount - 1);
      document.title = document.title.replace(/\[[0-9]{1,}\]/i, '');
      if (notificationCount > 0) {
        document.title = ('[' + notificationCount + '] ' + document.title);      
      }
    }, 300);
  }
}

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('notification-close-button')) {
    notification.remove(event.target.parentNode);
  }
});