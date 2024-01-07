const hostname = '127.0.0.1'; // Localhost
const port = 3000; // Default port

function streamAudioFromYouTube() {
  const link = document.getElementById('youtubeLink').value;
  fetch(`http://${hostname}:${port}/stream`, {
    method: 'POST',
    body: new URLSearchParams({url: link})
  })
  .then(response => response.blob())
  .then(blob => {
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(blob);
    audio.setAttribute("controls", "controls");
    document.body.appendChild(audio);
    audio.play();
  });
}

document.getElementById('playAudioButton').addEventListener('click', streamAudioFromYouTube);
// () => {
//   console.log('button clicked!')
//   document.getElementById('message').textContent = 'Button clicked!';
// } );