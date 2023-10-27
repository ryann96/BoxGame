---
toc: true
comments: false
layout: post
title: Easy Mode
description: Just started.
type: platforms
courses: { compsci: {week: 1} }
---

<style>
    #canvas {
        margin: 0;
        border: 1px solid white;
    }
</style>
<canvas id='canvas'></canvas>
<script>
    // Create empty canvas
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d');
    // Set the canvas dimensions
    canvas.width = 650;
    canvas.height = 400;
    // Define gravity value
    let gravity = 1.5;
    // Load the box image
    let boxImage = new Image();
    boxImage.src = 'box.png'; // Replace 'box.png' with the path to your box image
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
            c.drawImage(boxImage, this.position.x, this.position.y, this.width, this.height);
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
        },
        up: {
            pressed: false
        },
        down: {
            pressed: false
        }
    };
    // Animation function to continuously update and render the canvas
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        if (keys.right.pressed && player.position.x + player.width <= canvas.width - 50) {
            player.velocity.x = 5; // Adjust the movement speed
        } else if (keys.left.pressed && player.position.x >= 50) {
            player.velocity.x = -5; // Adjust the movement speed
        } else {
            player.velocity.x = 0;
        }
        if (keys.down.pressed && player.position.y + player.height <= canvas.height - 50) {
            player.velocity.y = 5; // Adjust the movement speed
        } else if (keys.up.pressed && player.position.y >= 50) {
            player.velocity.y = -5; // Adjust the movement speed
        } else {
            player.velocity.y = 0;
        }
    }
    animate();
    // Event listener for keydown events
    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 37: // Left arrow key
                keys.left.pressed = true;
                break;
            case 38: // Up arrow key
                keys.up.pressed = true;
                break;
            case 39: // Right arrow key
                keys.right.pressed = true;
                break;
            case 40: // Down arrow key
                keys.down.pressed = true;
                break;
        }
    });
    // Event listener for keyup events
    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 37:
                keys.left.pressed = false;
                break;
            case 38:
                keys.up.pressed = false;
                break;
            case 39:
                keys.right.pressed = false;
                break;
            case 40:
                keys.down.pressed = false;
                break;
        }
    });
</script>