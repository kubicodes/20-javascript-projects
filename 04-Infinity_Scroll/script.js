const accessKey = 'okj46LFJoAVuaTy7wSg0oCBzSzK1lIp5eyqlbXAQcs4';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoDataFromApi = [];

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(elementToInsert, attributes) {
  for (const key in attributes) {
    elementToInsert.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoDataFromApi.length;
  photoDataFromApi.forEach(photo => {
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    const anchorTag = document.createElement('a');
    setAttributes(anchorTag, {
      href: photo.links.html,
      target: '_blank',
    });

    img.addEventListener('load', imageLoaded);
    anchorTag.appendChild(img);
    imageContainer.appendChild(anchorTag);
  });
}
async function getPhotosFromApi() {
  try {
    const response = await fetch(apiUrl);
    photoDataFromApi = await response.json();

    displayPhotos();
  } catch (error) {
    console.error('Couldn´t fetch data');
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromApi();
  }
});

// On Load
getPhotosFromApi();
