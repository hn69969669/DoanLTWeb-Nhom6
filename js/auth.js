// Hàm xử lý đăng ký
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const password = form.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value;
    
    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    
    // Lấy danh sách users từ localStorage hoặc tạo mảng mới nếu chưa có
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra email đã tồn tại
    if (users.some(user => user.email === email)) {
        alert('Email already exists!');
        return false;
    }
    
    // Thêm user mới
    users.push({
        fullName,
        email,
        password // Trong thực tế nên mã hóa mật khẩu
    });
    
    // Lưu vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Hiển thị thông báo thành công
    const successAlert = document.getElementById('registerSuccess');
    successAlert.style.display = 'block';
    
    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        successAlert.style.display = 'none';
        // Đóng modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        modal.hide();
    }, 3000);
    
    return false;
}

// Hàm xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Lấy danh sách users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Tìm user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Lưu trạng thái đăng nhập
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Hiển thị thông báo thành công
        const successAlert = document.getElementById('loginSuccess');
        successAlert.style.display = 'block';
        
        // Cập nhật UI
        updateAuthUI(true);
        
        // Ẩn thông báo và đóng modal sau 3 giây
        setTimeout(() => {
            successAlert.style.display = 'none';
            const modal = bootstrap.Modal.getInstance(document.getElementById('signinModal'));
            modal.hide();
        }, 3000);
    } else {
        alert('Invalid email or password!');
    }
    
    return false;
}

// Hàm xử lý đăng xuất
function handleLogout() {
    // Xóa thông tin user hiện tại
    localStorage.removeItem('currentUser');
    
    // Cập nhật UI
    updateAuthUI(false);
}

// Hàm cập nhật UI dựa trên trạng thái đăng nhập
function updateAuthUI(isLoggedIn) {
    // Tìm tất cả các phần tử auth-buttons và user-actions trên trang
    const authButtonsList = document.querySelectorAll('.auth-buttons');
    const userActionsList = document.querySelectorAll('.user-actions');
    
    // Cập nhật trạng thái cho tất cả các phần tử
    authButtonsList.forEach(authButtons => {
        authButtons.style.display = isLoggedIn ? 'none' : 'block';
    });
    
    userActionsList.forEach(userActions => {
        userActions.style.display = isLoggedIn ? 'block' : 'none';
    });
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateAuthUI(true);
    } else {
        updateAuthUI(false);
    }
}

// Thêm vào đoạn code load header
function loadScript(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            // Kiểm tra trạng thái đăng nhập sau khi header được tải
            if (elementId === 'header') {
                checkLoginStatus();
            }
        });
}

// Kiểm tra trạng thái đăng nhập khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

// Thêm event listener cho việc load header động
document.addEventListener('headerLoaded', () => {
    checkLoginStatus();
});

// Hàm xử lý đăng xuất
function handleLogout() {
    // Xóa thông tin user hiện tại
    localStorage.removeItem('currentUser');
    
    // Cập nhật UI
    const authButtonsList = document.querySelectorAll('.auth-buttons');
    const userActionsList = document.querySelectorAll('.user-actions');
    
    authButtonsList.forEach(authButtons => {
        authButtons.style.display = 'block';
    });
    
    userActionsList.forEach(userActions => {
        userActions.style.display = 'none';
    });

    // Chuyển về trang chủ sau khi đăng xuất (tùy chọn)
    window.location.href = '/index.html';
}