
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("header", "../components/header.html");
  loadPartial("footer", "../components/footer.html");
});

function loadPartial(elementId, partialPath) {
  const container = document.getElementById(elementId);
  if (!container) return;
  fetch(partialPath)
    .then(res => res.text())
    .then(data => (container.innerHTML = data))
    .catch(err => console.error(err));
}