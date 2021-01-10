const videoElement = document.getElementById('video');

async function selectMediaStream() {
  try {
    const selectedMediaStream = await navigator.mediaDevices.getDisplayMedia();

    videoElement.srcObject = selectedMediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.error(error);
  }
}

const startButton = document.getElementById('button');
startButton.addEventListener('click', async () => {
  startButton.disabled = true;

  await videoElement.requestPictureInPicture();
  startButton.disabled = false;
});
selectMediaStream();
