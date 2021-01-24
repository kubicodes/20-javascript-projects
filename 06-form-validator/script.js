const form = document.querySelector('#form');
const messageContainer = document.querySelector('.message-container');

let isPasswordValid = false;

function confirmPassword(passwordInput, passwordConfirmation) {
  if (passwordInput === passwordConfirmation) {
    isPasswordValid = true;
  } else {
    isPasswordValid = false;
  }
}

function createUser() {
  const newUser = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password1.value,
  };
}

function showPasswordMatchError() {
  messageContainer.style.color = 'red';
  messageContainer.style.borderColor = 'red';
  messageContainer.querySelector('#message').textContent =
    'Passwords don´t match';
}

function displayDefaultMessage() {
  messageContainer.style.color = 'black';
  messageContainer.style.borderColor = 'black';
  messageContainer.querySelector('#message').textContent = "Don't Hesitate!";
}

function submitFormData(event) {
  event.preventDefault();
  confirmPassword(form.password1.value, form.password2.value);

  if (!isPasswordValid) {
    showPasswordMatchError();
  } else {
    createUser();
    form.reset();
    form.name.focus();
    displayDefaultMessage();
  }
}

form.addEventListener('submit', submitFormData);
