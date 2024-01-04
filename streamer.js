// Install the library (if not already installed): npm install ytdl-core@4.11.5
const ytdl = require('youtube-dl-core');

function playAudioFromYouTube() {
  const youtubeLink = document.getElementById('youtubeLink').value;
  const statusElement = document.getElementById('status');

  try {
    const audio = document.createElement('audio');
    const stream = ytdl(youtubeLink, { quality: 'highestaudio', filter: 'audioonly' });

    stream.on('info', info => {
      console.log('Available formats:', info.formats);
      console.log('Selected format:', info.format);
      statusElement.textContent = 'Loading audio...';
    });

    stream.on('error', error => {
      console.error('Error:', error);
      statusElement.textContent = 'Error loading audio!';
    });

    stream.pipe(audio);
    audio.play();
    statusElement.textContent = 'Playing audio...';
  } catch (error) {
    console.error('Error:', error);
    statusElement.textContent = 'Error playing audio!';
  }
}

document.getElementById('playAudioButton').addEventListener('click', playAudioFromYouTube);
// () => {
//   console.log('button clicked!')
//   document.getElementById('message').textContent = 'Button clicked!';
// } );