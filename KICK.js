const KickPlayer = {
    // Function to handle kicking the player
    kickPlayer: async function () {
        // Get values from the input fields
        const gameId = prompt("Enter the Game ID:");
        const playerName = prompt("Enter the Player Name:");

        // Check if both fields are filled
        if (!gameId || !playerName) {
            alert("Please provide both the Game ID and Player Name.");
            return;
        }

        // API URL for kicking the player
        const url = `https://www.blooket.com/api/firebase/client?id=${gameId}&name=${playerName}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                alert(`Player ${playerName} has been kicked from game ${gameId}.`);
            } else {
                alert('Failed to kick player: ' + response.statusText);
            }
        } catch (error) {
            alert('Error kicking player: ' + error);
        }
    },

    // Function to create the "Kick Player" button
    createButton: function () {
        const button = document.createElement('button');
        button.textContent = 'Kick Player';
        button.style.position = 'fixed';
        button.style.bottom = '10px';
        button.style.right = '10px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#2ecc71';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.fontWeight = 'bold';
        button.style.transition = 'background-color 0.2s ease';

        // Add hover effect for the button
        button.onmouseover = function() {
            button.style.backgroundColor = '#27ae60';
        };
        button.onmouseout = function() {
            button.style.backgroundColor = '#2ecc71';
        };

        // Button click event
        button.onclick = function () {
            KickPlayer.kickPlayer();
        };

        // Add the button to the body
        document.body.appendChild(button);
    }
};

// Create the "Kick Player" button when the page loads
KickPlayer.createButton();
