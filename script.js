// WebSocket for Lanyard Discord Presence
const socket = new WebSocket('wss://api.lanyard.rest/socket');
const userId = "511106356267319296"; // Replace with your Discord User ID

// HTML element to display Discord presence
const presenceEl = document.getElementById('discord-status');

// WebSocket connection logic
socket.addEventListener('open', () => {
    console.log('Connected to Lanyard WebSocket');
    
    // Subscribe to the Lanyard WebSocket for your Discord user ID
    socket.send(JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: userId,
        },
    }));
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    
    if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
        const presence = data.d;

        // Update the status message based on Discord status
        let statusMessage = '';
        switch (presence.discord_status) {
            case 'online':
                statusMessage = "Will respond almost instantly!";
                break;
            case 'idle':
                statusMessage = "AFK";
                break;
            case 'dnd':
                statusMessage = "Busy/might respond 70% of the time";
                break;
            case 'offline':
                statusMessage = "Sleeping";
                break;
        }

        // If Spotify is active, display the song being listened to
        if (presence.listening_to_spotify) {
            const song = presence.spotify.song;
            const artist = presence.spotify.artist;
            const album = presence.spotify.album;
            statusMessage = `Listening to ${song} by ${artist}`;
        }
        
        // If playing a game, display the game being played
        if (presence.activities && presence.activities.length > 0) {
            const game = presence.activities.find(activity => activity.type === 0); // Type 0 is "Playing a game"
            if (game) {
                statusMessage = `Playing ${game.name}`;
            }
        }

        presenceEl.innerHTML = statusMessage;
    }
});

socket.addEventListener('close', () => {
    presenceEl.innerHTML = 'Disconnected from Discord';
});
