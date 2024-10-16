// JavaScript to handle play/pause functionality
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');

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

// Change button style on audio end
audio.addEventListener('ended', () => {
    playPauseBtn.classList.remove('pause-btn');
    playPauseBtn.classList.add('play-btn');
});
