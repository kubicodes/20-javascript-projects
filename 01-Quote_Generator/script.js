const quoteSpan = document.getElementById('quote');
const authorSpan = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');
const tweetButton = document.getElementById('twitter');

async function getQuote() {
  const apiUrl = 'https://api.quotable.io/random';
  showLoader();

  try {
    const response = await fetch(apiUrl);
    const responseDataJSON = await response.json();

    hideLoader();
    displayQuote(responseDataJSON);
  } catch (err) {
    hideLoader();
    displayErrorForUser();
  }
}

function displayQuote(quoteDataJSON) {
  quoteSpan.innerText = quoteDataJSON.content;
  authorSpan.innerText = quoteDataJSON.author;
}

function displayErrorForUser() {
  quoteSpan.innerText = 'THERE WAS AN ERROR. PLEASE LOAD NEW QUOTE';
  quoteSpan.style.color = 'red';
  authorSpan.hidden = true;
}

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function tweetCurrentQuote() {
  const twitterWebIntentURL = 'https://twitter.com/intent/tweet';
  const currentQuote = `${quoteSpan.innerText} - ${authorSpan.innerText}`;
  const tweetUrl = `${twitterWebIntentURL}?text=${currentQuote}`;

  window.open(tweetUrl, '_blank');
}

newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweetCurrentQuote);

getQuote();
