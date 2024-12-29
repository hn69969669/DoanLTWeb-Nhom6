// Function to load auth module
function loadAuthModule() {
    fetch('/components/signin+signup.html')
        .then(response => response.text())
        .then(html => {
            // Create temporary container
            const temp = document.createElement('div');
            temp.innerHTML = html;
            // Append to body
            document.body.appendChild(temp);
            initializeAuthForms(); // Initialize forms after loading HTML
        });
}

// Auth related functions
function openModal(type) {
    document.getElementById(`${type}Overlay`).classList.add('active');
    document.getElementById(`${type}Modal`).classList.add('active');
}

function closeModal(type) {
    document.getElementById(`${type}Overlay`).classList.remove('active');
    document.getElementById(`${type}Modal`).classList.remove('active');
}

// Handle form submissions
function initializeAuthForms() {
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your authentication logic here
            console.log('Form submitted');
        });
    });

    // Update click handlers
    document.querySelectorAll('[data-bs-target="#signinModal"]').forEach(button => {
        button.onclick = () => openModal('signin');
    });
    document.querySelectorAll('[data-bs-target="#signupModal"]').forEach(button => {
        button.onclick = () => openModal('signup');
    });

    // Close modal when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id.replace('Overlay', ''));
            }
        });
    });
}

// Initialize auth module
document.addEventListener('DOMContentLoaded', () => {
    loadAuthModule();
});





