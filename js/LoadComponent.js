function loadScript(component, elementId) {
  fetch(component)
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    });
}

// Remove or comment out the initializeModalHandlers function
/*
function initializeModalHandlers() {
  const modals = ['signin', 'signup'].map(type => 
    new bootstrap.Modal(document.getElementById(`${type}Modal`))
  );
  
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-bs-target').replace('#', '');
      const modal = modals.find(m => m._element.id === target);
      if(modal) modal.show();
    });
  });
}

// Update your myFunction to call this after loading components
function myFunction() {
  loadScript("/components/header.html", "header");
  loadScript("/components/footer.html", "footer");
  setTimeout(initializeModalHandlers, 100); // Give components time to load
}
*/
