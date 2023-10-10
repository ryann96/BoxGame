---
toc: true
comments: true
layout: post
title: Strawberry Squisher Animation
description:  Example!!! This sample shows markdown cell, markdown table, markdown code fencing, and code cells.
courses: { compsci: {week: 1} }
type: hacks
---

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="StrawberrySquisher" src="{{site.baseurl}}/images/StrawberrySquisher.png"> 
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="A" checked>
            <label for="idle">A</label><br>
            <input type="radio" name="animation" id="B">
            <label for="barking">B</label><br>
            <input type="radio" name="animation" id="C">
            <label for="walking">C</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 120;  // matches sprite pixel width
        const SPRITE_HEIGHT = 100; // matches sprite pixel height
        const SCALE_FACTOR = 1;  // control size of sprite on canvas
        const FRAME_LIMIT = 6;  // number of frames per row, this code assume each row is same
        // const FRAME_RATE = 15;  // not used
        const FRAME_RATE = 30; // 30 frames per second
        const DESIRED_FRAME_RATE = 8; // 1 frames per second
        const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class StrawberrySquisher{
            constructor() {
                this.image = document.getElementById("StrawberrySquisher");
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
        const strawberrySquisher = new StrawberrySquisher();

        // update frameY of dog object, action from idle, bark, walk radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'A':
                        strawberrySquisher.frameY = 0;
                        break;
                    case 'B':
                        strawberrySquisher.frameY = 1;
                        break;
                    case 'C':
                        strawberrySquisher.frameY = 2;
                        break;
                        

                    default:
                        break;
                }
            }
        });
        let lastTimestamp = 0;
        // Animation recursive control function
        function animate(timestamp) {
            const deltaTime = timestamp - lastTimestamp;
            if (deltaTime >= FRAME_INTERVAL) {
                // Clears the canvas to remove the previous frame.
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Draws the current frame of the sprite.
                strawberrySquisher.draw(ctx);

                // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
                strawberrySquisher.update();

            // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
            // ensuring smooth visuals.
                lastTimestamp = timestamp;
                }
            requestAnimationFrame(animate);
        }
        // run 1st animate
        animate();
    });
</script>