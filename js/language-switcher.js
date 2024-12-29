// Lưu vào file language-switcher.js
function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    let newPath;

    // Xử lý trang chủ
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index-vi.html') {
        newPath = lang === 'vi' ? '/index-vi.html' : '/index.html';
    }
    // Xử lý các trang trong thư mục html
    else if (currentPath.includes('/html/')) {
        const baseName = currentPath.split('/').pop().replace('.html', '').replace('-vi', '');
        newPath = `/html/${baseName}${lang === 'vi' ? '-vi' : ''}.html`;
    }

    // Cập nhật trạng thái nút
    updateButtons(lang === 'vi');

    // Chuyển hướng nếu có đường dẫn mới
    if (newPath && newPath !== currentPath) {
        window.location.href = newPath;
    }
}

// Cập nhật trạng thái các nút ngôn ngữ
function updateButtons(isVietnamese) {
    const enBtn = document.getElementById('enBtn');
    const viBtn = document.getElementById('viBtn');

    if (isVietnamese) {
        enBtn.classList.remove('active');
        enBtn.classList.add('inactive');
        viBtn.classList.remove('inactive');
        viBtn.classList.add('active');
    } else {
        enBtn.classList.remove('inactive');
        enBtn.classList.add('active');
        viBtn.classList.remove('active');
        viBtn.classList.add('inactive');
    }
}

// Kiểm tra và cập nhật trạng thái ngôn ngữ khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const isVietnamese = currentPath.includes('-vi');
    updateButtons(isVietnamese);
});