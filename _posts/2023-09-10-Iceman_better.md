---
toc: true
comments: false
layout: post
title: Iceman2 Animation
description: idk
type: hacks
courses: { compsci: {week: 1} }
---

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
        </canvas>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 52.54;  // matches sprite pixel width
        const SPRITE_HEIGHT = 95; // matches sprite pixel height
        const SCALE_FACTOR = 2;  // control size of sprite on canvas
        const FRAME_LIMIT = 22;  // number of frames per row, this code assume each row is same

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR*8;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        // Create an Image object
        const dogImage = new Image();

        // Set the src attribute
        dogImage.src = "{{site.baseurl}}/images/Iceman.png"; // Change the image path here

        // Wait for the image to load
        dogImage.onload = function () {
            class Dog {
                constructor() {
                    this.image = dogImage; // Use the loaded image
                    this.spriteWidth = SPRITE_WIDTH;
                    this.spriteHeight = SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = 0;
                    this.y = 0;
                    this.scale = SCALE_FACTOR;
                    this.minFrame = 0;
                    this.maxFrame = FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.velocityX = 7;
                }

                // draw dog object
                draw(context) {
                    context.drawImage(
                        this.image,
                        this.frameX * this.spriteWidth,
                        this.frameY * this.spriteHeight,
                        this.spriteWidth,
                        this.spriteHeight,
                        this.x,
                        this.y,
                        this.width * this.scale,
                        this.height * this.scale
                    );
                }

                // update frameX of object
                update() {
                    if (this.frameX < this.maxFrame) {
                        this.frameX++;
                    } else {
                        this.frameX = 0;
                    }

                // Update x position for horizontal movement
                    this.x += this.velocityX;

                // Reset x position if it goes beyond the canvas
                    if (this.x > canvas.width) {
                        this.x = -this.width * this.scale;
                }
                }
            }

            // dog object
            const dog = new Dog();

            // Animation recursive control function
            function animate() {
                // Clears the canvas to remove the previous frame.
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draws the current frame of the sprite.
                dog.draw(ctx);

                // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
                dog.update();

                // Use setTimeout to introduce a delay before the next frame
                setTimeout(function () {
                    // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
                    // ensuring smooth visuals. Call `animate` again to continue the animation loop.
                    requestAnimationFrame(animate);
                }, 50); // Set the timeout delay in milliseconds (e.g., 100ms = 0.1 second)
            }

            // Start the animation loop
            animate();
        };
    });
</script>

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
            this.icemanDetails = {
            width: 52.54,   // The width of the iceman
            height: 95,     // The height of the iceman
            // Add other details if needed
        };
        }
        // Method to draw the player on the canvas
        draw() {
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        // Method to update the players position and velocity
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
</script>
