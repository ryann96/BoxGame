window.addEventListener('load', function () {
    const canvas = document.getElementById('spriteContainer');
    const ctx = canvas.getContext('2d');
    const SPRITE_WIDTH = 102.3; // Matches sprite pixel width
    const SPRITE_HEIGHT = 115; // Matches sprite pixel height
    const FRAME_LIMIT = 5; // Number of frames per sprite row
    const SCALE_FACTOR = 3; // Control size of sprite on canvas
    const DESIRED_FRAME_RATE = 4; // Frames per second
    const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;

    canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
    canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

    class Cat {
        constructor() {
            this.image = document.getElementById("box");
            this.x = 0;
            this.y = 0;
            this.minFrame = 0;
            this.frameY = 0;
            this.frameX = 0;
            this.maxFrame = FRAME_LIMIT;
            this.frameX = 0;
            this.frameY = 0;
        }

        // Draw object
        draw(context) {
            context.drawImage(
                this.image,
                this.frameX * SPRITE_WIDTH,
                this.frameY * SPRITE_HEIGHT,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
                this.x,
                this.y,
                canvas.width,
                canvas.height
            );
        }

        // Update frameX of object
        update() {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    }

    // Object
    const cat = new Cat();

    // Update frameY of object, action from idle, bark, walk radio control
    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            switch (selectedAnimation) {
                case 'defult':
                    cat.frameY = 5;
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
            cat.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            cat.update();

            lastTimestamp = timestamp;
        }

        // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
        // ensuring smooth visuals.
        requestAnimationFrame(animate);
    }

    // Run the animation
    animate();
});