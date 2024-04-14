document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('.cta_send');
    const errorMessages = document.querySelectorAll('.error-message');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Reset error messages
        errorMessages.forEach(function (errorMessage) {
            errorMessage.textContent = '';
        });

        // Validate name
        if (nameInput.value.length < 5) {
            showError(nameInput, 'Name must be at least 5 characters long');
        }

        // Validate last name
        if (lastNameInput.value.length < 5) {
            showError(lastNameInput, 'Last name must be at least 5 characters long');
        }

        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Invalid email address');
        }

        // Validate subject
        if (subjectInput.value.length < 15) {
            showError(subjectInput, 'Subject must be at least 15 characters long');
        }

        // Validate message
        if (messageInput.value.length < 25) {
            showError(messageInput, 'Message must be at least 25 characters long');
        }
    });

    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
    }

    function isValidEmail(email) {
        // En enkel validering av e-postadresse
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
