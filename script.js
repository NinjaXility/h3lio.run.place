// JavaScript to handle play/pause functionality and progress bar
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');

// Function to toggle play and pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('play-btn');
        playPauseBtn.classList.add('pause-btn');
    } else {
        audio.pause();
        playPauseBtn.classList.remove('pause-btn');
        playPauseBtn.classList.add('play-btn');
    }
}

// Add event listener to the button
playPauseBtn.addEventListener('click', togglePlayPause);

// Update progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
});

// Reset play button when audio ends
audio.addEventListener('ended', () => {
    playPauseBtn.classList.remove('pause-btn');
    playPauseBtn.classList.add('play-btn');
    progressBar.style.width = '0%'; // Reset progress bar
});
