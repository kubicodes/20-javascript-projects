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
