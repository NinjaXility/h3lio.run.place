// JavaScript to handle play/pause functionality and progress bar
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const durationTimeElement = document.getElementById('durationTime');

// Function to format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

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

// Update progress bar and time as the audio plays
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
});

// Reset play button and time when audio ends
audio.addEventListener('ended', () => {
    playPauseBtn.classList.remove('pause-btn');
    playPauseBtn.classList.add('play-btn');
    progressBar.style.width = '0%'; // Reset progress bar
    currentTimeElement.textContent = '0:00'; // Reset current time
});

// Set total duration once audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationTimeElement.textContent = formatTime(audio.duration);
});
