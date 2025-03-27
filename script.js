
// Show notification
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#ff6b6b' : '#4CAF50';
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const adminForm = document.getElementById('adminForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
    adminForm.style.display = 'none';
}

// Show admin login form
function showAdminLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const adminForm = document.getElementById('adminForm');
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    adminForm.style.display = 'block';
}

// Show user login form
function showUserLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const adminForm = document.getElementById('adminForm');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    adminForm.style.display = 'none';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        showNotification('Login successful!');
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showNotification('Invalid email or password', true);
    }
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', true);
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showNotification('Email already registered', true);
        return;
    }

    // Add new user
    users.push({ name, email, password, role: 'user' });
    localStorage.setItem('users', JSON.stringify(users));
    showNotification('Registration successful! Please login.');
    toggleForms();
}

// Handle admin login
function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === '123') {
        showNotification('Admin login successful!');
        localStorage.setItem('currentUser', JSON.stringify({
            name: 'Admin',
            email: username,
            role: 'admin'
        }));
        window.location.href = 'admin.html';
    } else {
        showNotification('Invalid admin credentials', true);
    }
}