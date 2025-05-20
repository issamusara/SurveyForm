document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const phoneInput = document.getElementById('phone');
    const satisfactionInputs = document.querySelectorAll('input[name="satisfaction"]');
    const feedbackInput = document.getElementById('feedback');
    const visitDateInput = document.getElementById('visit-date');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('success-message');

    // Validate on blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    ageInput.addEventListener('blur', validateAge);
    phoneInput.addEventListener('blur', validatePhone);
    feedbackInput.addEventListener('input', validateFeedback);
    visitDateInput.addEventListener('change', validateDate);
    passwordInput.addEventListener('blur', validatePassword);

    // Validate radio buttons on change
    satisfactionInputs.forEach(input => {
        input.addEventListener('change', validateSatisfaction);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isAgeValid = validateAge();
        const isPhoneValid = validatePhone();
        const isSatisfactionValid = validateSatisfaction();
        const isFeedbackValid = validateFeedback();
        const isDateValid = validateDate();
        const isPasswordValid = validatePassword();

        // If all required fields are valid, submit the form
        if (isNameValid && isEmailValid && isSatisfactionValid && isPasswordValid) {
            // In a real application, you would send the data to a server here
            console.log('Form submitted successfully!');
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            // Focus on the first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isSatisfactionValid) satisfactionInputs[0].focus();
            else if (!isPasswordValid) passwordInput.focus();
        }
    });

    // Validation functions
    function validateName() {
        const errorElement = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            showError(nameInput, errorElement, 'Please enter your full name');
            return false;
        } else {
            showSuccess(nameInput, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorElement, 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }

    function validateAge() {
        const errorElement = document.getElementById('age-error');
        const age = parseInt(ageInput.value);
        
        // Age is optional, so only validate if there's a value
        if (ageInput.value && (isNaN(age) || age < 13 || age > 120)) {
            showError(ageInput, errorElement, 'Please enter a valid age between 13 and 120');
            return false;
        } else {
            showSuccess(ageInput, errorElement);
            return true;
        }
    }

    function validatePhone() {
        const errorElement = document.getElementById('phone-error');
        const phoneRegex = /^\d{10}$/;
        
        // Phone is optional, so only validate if there's a value
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            showError(phoneInput, errorElement, 'Please enter a 10-digit phone number');
            return false;
        } else {
            showSuccess(phoneInput, errorElement);
            return true;
        }
    }

    function validateSatisfaction() {
        const errorElement = document.getElementById('satisfaction-error');
        let isChecked = false;
        
        satisfactionInputs.forEach(input => {
            if (input.checked) isChecked = true;
        });
        
        if (!isChecked) {
            showError(null, errorElement, 'Please select a satisfaction level');
            return false;
        } else {
            showSuccess(null, errorElement);
            return true;
        }
    }

    function validateFeedback() {
        const errorElement = document.getElementById('feedback-error');
        
        if (feedbackInput.value.length > 500) {
            showError(feedbackInput, errorElement, 'Please limit your feedback to 500 characters');
            return false;
        } else {
            showSuccess(feedbackInput, errorElement);
            return true;
        }
    }

    function validateDate() {
        const errorElement = document.getElementById('date-error');
        
        // Date is optional, so only validate if there's a value
        if (visitDateInput.value) {
            const selectedDate = new Date(visitDateInput.value);
            const today = new Date();
            
            if (selectedDate > today) {
                showError(visitDateInput, errorElement, 'Please select a date in the past');
                return false;
            } else {
                showSuccess(visitDateInput, errorElement);
                return true;
            }
        } else {
            showSuccess(visitDateInput, errorElement);
            return true;
        }
    }

    function validatePassword() {
        const errorElement = document.getElementById('password-error');
        
        if (passwordInput.value.length < 8) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters long');
            return false;
        } else {
            showSuccess(passwordInput, errorElement);
            return true;
        }
    }

    // Helper functions
    function showError(input, errorElement, message) {
        if (input) {
            input.classList.add('input-error');
            input.classList.remove('input-success');
        }
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function showSuccess(input, errorElement) {
        if (input) {
            input.classList.remove('input-error');
            input.classList.add('input-success');
        }
        errorElement.classList.remove('show');
    }
});