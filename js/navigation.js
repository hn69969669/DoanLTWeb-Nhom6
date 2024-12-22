document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.getElementById('viewAllPropertiesBtn');
    
    viewAllBtn.addEventListener('click', function() {
        window.location.href = 'properties.html'; // Change to your desired page URL
    });
});