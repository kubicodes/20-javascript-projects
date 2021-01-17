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
  cookieBanner.classList.add('cookie-message', 'sticky');
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

//Navbar fade out links on hover
const nav = document.querySelector('nav');
const logo = document.querySelector('.nav__logo');
const links = document.querySelectorAll('.nav__item');

function fadeOutNavLinks(event) {
  const hoveredLink = event.target.closest('.nav__link');

  if (hoveredLink) {
    logo.style.opacity = this;

    links.forEach(link => {
      if (link.querySelector('a') !== hoveredLink) {
        link.style.opacity = this;
      }
    });
  }
}

nav.addEventListener('mouseover', fadeOutNavLinks.bind(0.5));
nav.addEventListener('mouseout', fadeOutNavLinks.bind(1));

//Sticky navigation
function stickyNavigation(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const navHeight = nav.getBoundingClientRect().height;

const navbarObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navbarObserver.observe(header);

//Revealing Section
const allSections = document.querySelectorAll('section');

function revealSection(entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazyload images of section oen
function lazyLoadSectionImages(entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const sectionOneImageObserver = new IntersectionObserver(
  lazyLoadSectionImages,
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  }
);
const sectionOneImages = document.querySelectorAll('#section--1 img');

sectionOneImages.forEach(image => {
  sectionOneImageObserver.observe(image);
});

//Teastimonials Slider
function slider() {
  const slides = document.querySelectorAll('.slide');
  const buttonLeft = document.querySelector('.slider__btn--left');
  const buttonRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const numberOfSlides = slides.length;

  function createDots() {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  function goToSlide(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  function nextSlide() {
    if (currentSlide === numberOfSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = numberOfSlides - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  function init() {
    goToSlide(0);
    createDots();

    activateDot(0);
  }
  init();

  buttonRight.addEventListener('click', nextSlide);
  buttonLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') prevSlide();
    event.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', event => {
    if (event.target.classList.contains('dots__dot')) {
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}

slider();
