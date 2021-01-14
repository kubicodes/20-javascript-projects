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

if (!localStorage.getItem('cookieBannerAccepted')) {
  header.append(cookieBanner);

  const cookieCloseButton = document.querySelector('.btn--close-cookie');
  cookieCloseButton.addEventListener('click', () => {
    localStorage.setItem('cookieBannerAccepted', 'true');
    cookieBanner.remove();
  });
}

//Smooth Scrolling - Learn More Button and Navbar
const scrollToButton = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');

scrollToButton.addEventListener('click', () => {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.classList.contains('nav__link')) {
    const clickedItem = event.target.getAttribute('href');

    if (clickedItem !== '#') {
      const sectionOfClickedItem = document.querySelector(clickedItem);
      sectionOfClickedItem.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

//Tabbed Content
const tabContainer = document.querySelector('.operations__tab-container');
const allTabButtons = document.querySelectorAll('.operations__tab');
const tabContentContainer = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', event => {
  const clickedButton = event.target.closest('button');

  if (!clickedButton) return;

  allTabButtons.forEach(tabButton =>
    tabButton.classList.remove('operations__tab--active')
  );
  clickedButton.classList.add('operations__tab--active');

  const dataTabOfClickedButton = clickedButton.dataset.tab;
  const contentOfClickedButton = document.querySelector(
    `.operations__content--${dataTabOfClickedButton}`
  );

  tabContentContainer.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  contentOfClickedButton.classList.add('operations__content--active');
});
