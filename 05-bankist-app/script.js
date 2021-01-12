//Open Account Modal
const openAccountModal = document.getElementById('open-account-modal');
const overlay = document.querySelector('.overlay');
const openAccountButtons = document.querySelectorAll('.btn--show-modal');
const closeAccountModalButton = document.getElementById(
  'close-open-account-modal'
);

function showOpenAccountModal(event) {
  event.preventDefault();
  openAccountModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeOpenAccountModal() {
  openAccountModal.classList.add('hidden');
  overlay.classList.add('hidden');
}

openAccountButtons.forEach(button =>
  button.addEventListener('click', showOpenAccountModal)
);
closeAccountModalButton.addEventListener('click', closeOpenAccountModal);
overlay.addEventListener('click', closeOpenAccountModal);

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    !openAccountModal.classList.contains('hidden')
  ) {
    closeOpenAccountModal();
  }
});

//Cookie Banner
function createCookieBanner() {
  const cookieBanner = document.createElement('div');
  cookieBanner.classList.add('cookie-message');
  cookieBanner.innerHTML =
    'We are using Cookies to improve your experience on our website.<button class="btn btn--close-cookie">Got it</button>';

  return cookieBanner;
}

const header = document.querySelector('header');
const cookieBanner = createCookieBanner();
header.append(cookieBanner);

const cookieCloseButton = document.querySelector('.btn--close-cookie');
cookieCloseButton.addEventListener('click', () => {
  cookieBanner.remove();
});

//Smooth Scrolling - Learn More Button and Navbar
const scrollToButton = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');

scrollToButton.addEventListener('click', () => {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});
