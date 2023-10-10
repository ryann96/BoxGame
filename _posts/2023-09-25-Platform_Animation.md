---
toc: true
comments: false
layout: post
title: platform go up
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
        const SPRITE_WIDTH = 362.25;  // matches sprite pixel width
        const SPRITE_HEIGHT = 377; // matches sprite pixel height
        const SCALE_FACTOR = 0.25;  // control size of sprite on canvas
        const FRAME_LIMIT = 3;  // number of frames per row, this code assume each row is same

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        // Create an Image object
        const dogImage = new Image();

        // Set the src attribute
        dogImage.src = "{{site.baseurl}}/images/platform.png"; // Change the image path here

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
                }, 100); // Set the timeout delay in milliseconds (e.g., 100ms = 0.1 second)
            }

            // Start the animation loop
            animate();
        };
    });
</script>
