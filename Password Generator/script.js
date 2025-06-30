document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');    
    const copyBtn = document.getElementById('copy-btn');    
    const lengthSlider = document.getElementById('length');    
    const lengthValue = document.getElementById('length-value');         
    const uppercaseCheckbox = document.getElementById('uppercase');                
    const lowercaseCheckbox = document.getElementById('lowercase');                  
    const numbersCheckbox = document.getElementById('numbers');    
    const symbolsCheckbox = document.getElementById('symbols');    
    const generateBtn = document.getElementById('generate-btn');    
    const strengthBar = document.getElementById('strength-bar');      
    const strengthText = document.getElementById('strength-text');                                
                         
    // Character sets                                      
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';                
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';             
    const numberChars = '0123456789';                                   
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';                       
                                       
    // Update length display                                
    lengthSlider.addEventListener('input', () => {                       
        lengthValue.textContent = lengthSlider.value;                 
    });                         
                                          
    // Generate password on button click                         
    generateBtn.addEventListener('click', generatePassword);                
                                       
    // Auto-generate on load                              
    generatePassword();                             
                                          
    // Copy password to clipboard                                 
    copyBtn.addEventListener('click', () => {                  
        if (!passwordField.value) return;                            
                                                                       
        navigator.clipboard.writeText(passwordField.value);               
                                                                      
        // Show tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied!';
        copyBtn.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    });

    function generatePassword() {
        let chars = '';
        let password = '';
        
        if (uppercaseCheckbox.checked) chars += uppercaseChars;
        if (lowercaseCheckbox.checked) chars += lowercaseChars;
        if (numbersCheckbox.checked) chars += numberChars;
        if (symbolsCheckbox.checked) chars += symbolChars;
        
        if (!chars) {
            passwordField.value = 'Select at least one option';
            return;
        }
        
        for (let i = 0; i < lengthSlider.value; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        passwordField.value = password;
        updateStrength(password);
    }

    function updateStrength(password) {
        // Strength calculation (based on length & character diversity)
        let strength = 0;
        
        if (password.length >= 12) strength += 2;
        else if (password.length >= 8) strength += 1;
        
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update UI
        if (strength <= 2) {
            strengthBar.style.width = '33%';
            strengthBar.style.background = '#e74c3c';
            strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
            strengthBar.style.width = '66%';
            strengthBar.style.background = '#f39c12';
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.style.width = '100%';
            strengthBar.style.background = '#2ecc71';
            strengthText.textContent = 'Strong';
        }
    }
});