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
        dogImage.src = "{{site.baseurl}}/images/Iceman flipped.png"; // Change the image path here

        // Wait for the image to load
        dogImage.onload = function () {
            class Dog {
                constructor() {
                    this.image = dogImage; // Use the loaded image
                    this.spriteWidth = SPRITE_WIDTH;
                    this.spriteHeight = SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = canvas.width; // Start from the right edge of the canvas
                    this.y = Math.random() * (canvas.height - this.height); // Random initial Y position
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

               // update frameX and position of the object
            update(currentTime) {
                if (currentTime - this.lastAppearTime > this.appearInterval) {
                    // Reset the sprite's position and appear interval
                    this.x = canvas.width;
                    this.y = Math.random() * (canvas.height - this.height);
                    this.appearInterval = Math.random() * 5000 + 1000; // Random appear interval
                    this.lastAppearTime = currentTime;
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
