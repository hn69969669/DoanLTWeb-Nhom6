function loadScript(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (elementId === 'header') {
        checkLoginStatus();
        document.dispatchEvent(new Event('headerLoaded'));
      }
    })
    .catch(error => {
      console.error('Error loading component:', error);
    });
}
