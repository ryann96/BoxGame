---
toc: true
comments: false
layout: post
title: Easy Mode
description: Just started.
type: platforms
courses: { compsci: {week: 5} }
---

<style>
    .canvas-container {
        display: flex;
        background-image: url('images/Backy_Roundy.jpg');
        background-size: repeat; 
        background-attachment: fixed;
        background-repeat: repeat;
    }
    canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>

<body>
    <div class="canvas-container">
        <canvas id="playerCanvas">
                <img id="box" src="{{site.baseurl}}/images/box.png">
        </canvas>
    </div>
</body>

<script>
    // Create empty canvas
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d');
    // Set the canvas dimensions
    canvas.width = 650;
    canvas.height = 400;
    // Define gravity value
    let gravity = 1.5;
    // Load the player sprite image
    let playerImage = new Image();
    playerImage.src = 'TestBox.png'; // Replace 'TestBox.png' with the correct path to your image
    // Ensure the image is fully loaded before drawing
    playerImage.onload = function() {
        // Define the Player class
        class Player {
            constructor() {
                // Initial position and velocity of the player
                this.position = {
                    x: 100,
                    y: 200
                };
                this.velocity = {
                    x: 0,
                    y: 0
                };
                // Dimensions of the player
                this.width = 50; // Adjust the width to match your image
                this.height = 50; // Adjust the height to match your image
            }
            // Method to draw the player image on the canvas
            draw() {
                c.drawImage(playerImage, this.position.x, this.position.y, this.width, this.height);
            }
            // Method to update the player's position and velocity
            update() {
                this.draw();
                this.position.y += this.velocity.y;
                this.position.x += this.velocity.x;
                if (this.position.y + this.height + this.velocity.y <= canvas.height)
                    this.velocity.y += gravity;
                else
                    this.velocity.y = 0;
            }
        }
        // Create a player object
        player = new Player();
        // Define keyboard keys and their states
        let keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        };
        // Animation function to continuously update and render the canvas
        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);
            player.update();
            if (keys.right.pressed && player.position.x + player.width <= canvas.width - 50) {
                player.velocity.x = 15;
            } else if (keys.left.pressed && player.position.x >= 50) {
                player.velocity.x = -15;
            } else {
                player.velocity.x = 0;
            }
        }
        animate();
        // Event listener for keydown events
        addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                    console.log('left');
                    keys.left.pressed = true;
                    break;
                case 83:
                    console.log('down');
                    break;
                case 68:
                    console.log('right');
                    keys.right.pressed = true;
                    break;
                case 87:
                    console.log('up');
                    player.velocity.y -= 20;
                    break;
            }
        });
        // Event listener for keyup events
        addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                case 65:
                    console.log('left');
                    keys.left.pressed = false;
                    break;
                case 83:
                    console.log('down');
                    break;
                case 68:
                    console.log('right');
                    keys.right.pressed = false;
                    break;
                case 87:
                    console.log('up');
                    player.velocity.y = -20;
                    break;
            }
        });
    };
</script>
