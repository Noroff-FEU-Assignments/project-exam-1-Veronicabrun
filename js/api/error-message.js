// error-message.js

export function displayErrorMessage(message) {
    postContainer.classList.add('post-container');
    const errorMessageElement = document.createElement('div');
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add('error-message');
    blogContainer.appendChild(errorMessageElement);
}


export function removeErrorMessage() {
    const errorMessageElement = document.querySelector('.error-message');
    if (errorMessageElement) {
        errorMessageElement.remove();
    }
}
