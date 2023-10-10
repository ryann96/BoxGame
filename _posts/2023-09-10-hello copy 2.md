---
toc: true
comments: true
layout: post
title: Midnight Stalker Animation
description:  This is level _____ in our came mode for our game. This is the how they look separately.
courses: { gameparts: {week: 1} }
type: hacks
---


<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="ninjaSprite" src="{{site.baseurl}}/images/midnightStalker.png"> 
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="A" checked>
            <label for="idle">A</label><br>
            <input type="radio" name="animation" id="B">
            <label for="barking">B</label><br>
            <input type="radio" name="animation" id="C">
            <label for="walking">C</label><br>
            <input type="radio" name="animation" id="D">
            <label for="walking">D</label><br>
            <input type="radio" name="animation" id="E">
            <label for="walking">E</label><br>
            <input type="radio" name="animation" id="F">
            <label for="walking">F</label><br>
            <input type="radio" name="animation" id="G">
            <label for="walking">G</label><br>
            <input type="radio" name="animation" id="H">
            <label for="walking">H</label><br>
            <input type="radio" name="animation" id="I">
            <label for="walking">I</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 28;  // matches sprite pixel width
        const SPRITE_HEIGHT = 32; // matches sprite pixel height
        const SCALE_FACTOR = 5;  // control size of sprite on canvas
        const FRAME_LIMIT = 7;  // number of frames per row, this code assume each row is same
        // const FRAME_RATE = 15;  // not used
        const FRAME_RATE = 30; // 30 frames per second
        const DESIRED_FRAME_RATE = 8; // 1 frames per second
        const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Ninja {
            constructor() {
                this.image = document.getElementById("ninjaSprite");
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
        const ninja = new Ninja();

        // update frameY of dog object, action from idle, bark, walk radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'A':
                        ninja.frameY = 0;
                        break;
                    case 'B':
                        ninja.frameY = 1;
                        break;
                    case 'C':
                        ninja.frameY = 2;
                        break;
                    case 'D':
                        ninja.frameY = 3;
                        break;
                    case 'E':
                        ninja.frameY = 4;
                        break;
                    case 'F':
                        ninja.frameY = 5;
                        break;
                    case 'G':
                        ninja.frameY = 6;
                        break;
                    case 'H':
                        ninja.frameY = 7;
                        break;
                    case 'I':
                        ninja.frameY = 8;
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
                ninja.draw(ctx);

                // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
                ninja.update();

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