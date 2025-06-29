// Sign-up Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sign-up page
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Create user object
            const user = {
                name,
                email,
                phone,
                password // Note: In a real app, you would hash the password
            };
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('hotelUsers')) || [];
            const userExists = users.some(u => u.email === email);
            
            if (userExists) {
                alert('User with this email already exists!');
                return;
            }
            
            // Add new user and save to localStorage
            users.push(user);
            localStorage.setItem('hotelUsers', JSON.stringify(users));
            
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        });
    }
    
    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('hotelUsers')) || [];
            
            // Find user
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // In a real app, you would set a session or token here
                alert(`Welcome back, ${user.name}! Login successful.`);
                
                // Store in sessionStorage if "Remember me" is checked
                if (rememberMe) {
                    sessionStorage.setItem('currentHotelUser', JSON.stringify(user));
                }
                
                // Redirect to booking page (you would create this page)
                // window.location.href = 'booking.html';
            } else {
                alert('Invalid email or password!'); 
            }
        });
    }
});