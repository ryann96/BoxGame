---
toc: true
comments: false
layout: post
title: Iceman234 Animation
description: in progress
type: hacks
courses: { compsci: {week: 1} }
---
<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
        </canvas>
    </div>
</body>


<!-- Your HTML and Front Matter remain unchanged -->

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 52.54;  // matches sprite pixel width
        const SPRITE_HEIGHT = 95; // matches sprite pixel height
        const SCALE_FACTOR = 2;  // control size of sprite on canvas
        const FRAME_LIMIT = 22;  // number of frames per row, this code assumes each row is the same

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR * 8;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        // Create an Image object
        const icemanImage = new Image();

        // Set the src attribute
        icemanImage.src = "{{site.baseurl}}/images/Iceman flipped.png"; // Change the image path here

        // Wait for the image to load
        icemanImage.onload = function () {
            class Iceman {
                constructor() {
                    this.image = icemanImage; // Use the loaded image
                    this.spriteWidth = SPRITE_WIDTH;
                    this.spriteHeight = SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = canvas.width; // Start from the right edge of the canvas
                    this.y = 0;
                    this.scale = SCALE_FACTOR;
                    this.minFrame = 0;
                    this.maxFrame = FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.velocityX = -7; // Negative value to move from right to left
                    this.appearInterval = Math.random() * 5000 + 1000; // Random appear interval in milliseconds
                    this.lastAppearTime = 0;
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
                    // Check if 5 seconds have passed since the last appearance
                    const currentTime = new Date().getTime();
                    if (currentTime - this.lastAppearTime >= 5000) {
                        // Make the iceman disappear and reappear 200 pixels after
                        this.x = canvas.width + 200;
                        this.lastAppearTime = currentTime;
                    }

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

                    // Randomly change the appearance interval
                    if (Math.random() < 0.05) {
                        this.appearInterval = Math.random() * 5000 + 1000; // Random appear interval
                    }
                }
            }

            // dog object
            const iceman = new Iceman();

            // Animation recursive control function
            function animate() {
                // Clears the canvas to remove the previous frame.
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draws the current frame of the sprite.
                iceman.draw(ctx);

                // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
                iceman.update();

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