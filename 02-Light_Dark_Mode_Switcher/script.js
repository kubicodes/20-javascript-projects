function changeThemeMode(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('themeMode', 'dark');
    isDark = true;
    changeThemeModeContent(isDark);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('themeMode', 'light');
    isDark = false;
    changeThemeModeContent(isDark);
  }
}

function changeThemeModeContent(isDark) {
  const nav = document.querySelector('nav');
  nav.style.background = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%';

  const images = document.querySelectorAll('.about-container img');
  images.forEach(image => {
    image.src = isDark
      ? image.src.replace('light', 'dark')
      : image.src.replace('dark', 'light');
  });

  const textBox = document.getElementById('text-box');
  textBox.style.background = isDark
    ? 'rgb(255 255 255 / 50%)'
    : 'rgb(0 0 0 / 50%';

  const toggleText = document.querySelector('.toggle-text');
  toggleText.textContent = isDark ? 'Dark Mode' : 'Ligt Mode';

  const toggleIcon = document.querySelector('#toggle-icon i');
  if (isDark) {
    toggleIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    toggleIcon.classList.replace('fa-moon', 'fa-sun');
  }
}

//Application
let isDark = false;

const themeModeSwitcher = document.getElementById('mode-switcher');
themeModeSwitcher.addEventListener('change', changeThemeMode);

let themeFromLocalStorage = localStorage.getItem('themeMode');
if (themeFromLocalStorage) {
  document.documentElement.setAttribute('data-theme', themeFromLocalStorage);

  if (themeFromLocalStorage === 'dark') {
    themeModeSwitcher.checked = true;
    changeThemeModeContent((isDark = true));
  }
}
