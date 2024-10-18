const presenceContainer = document.getElementById("presence-container");
const statusElement = document.getElementById("status");
const spotifyElement = document.getElementById("spotify");
const gameElement = document.getElementById("game");

async function fetchDiscordPresence() {
    try {
        const response = await fetch("https://api.lanyard.rest/v1/users/511106356267319296");
        const data = await response.json();

        const presence = data.data;
        const status = presence.discord_status;

        // Default statuses
        let statusMessage = "";
        switch (status) {
            case "online":
                statusMessage = "Will respond almost instantly!";
                break;
            case "idle":
                statusMessage = "AFK";
                break;
            case "dnd":
                statusMessage = "Busy/might respond 70% of the time";
                break;
            case "offline":
                statusMessage = "Sleeping";
                break;
        }

        statusElement.innerHTML = statusMessage;

        // Spotify Status
        if (presence.listening_to_spotify) {
            const song = presence.spotify.song;
            const artist = presence.spotify.artist;
            spotifyElement.innerHTML = `Listening to <strong>${song}</strong> by ${artist}`;
        } else {
            spotifyElement.innerHTML = ""; // Hide Spotify element when not listening
        }

        // Game Status
        if (presence.activities && presence.activities.length > 0) {
            const game = presence.activities.find(activity => activity.type === 0); // Game activity
            if (game) {
                gameElement.innerHTML = `Playing <strong>${game.name}</strong>`;
            } else {
                gameElement.innerHTML = ""; // Hide Game element when not playing
            }
        } else {
            gameElement.innerHTML = ""; // Hide Game element when no activity
        }
    } catch (error) {
        console.error("Error fetching Discord presence:", error);
    }
}

// Fetch presence data on load
fetchDiscordPresence();

// Refresh presence data every 15 seconds
setInterval(fetchDiscordPresence, 15000);

