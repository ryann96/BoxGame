window.addEventListener('load', function () {
    const canvas = document.getElementById('spriteContainer');
    const ctx = canvas.getContext('2d');
    const SPRITE_WIDTH = 70;
    const SPRITE_HEIGHT = 70;
    const SCALE_FACTOR = 2;
    const DESIRED_FRAME_RATE = 15;
    const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;

    const animationData = {
        A: {
            frameLimit: 3,
            width: 71,
            height: 72
        },
        B: {
            frameLimit: 8,
            width: 79.5,
            height: 72
        },
        C: {
            frameLimit: 5,
            width: 76,
            height: 73
        },
        D: {
            frameLimit: 3,
            width: 76,
            height: 72
        }
    }

    canvas.width = 1000;
    canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

    class Pinky {
        constructor() {
            this.image = document.getElementById("pinky");
            this.spriteWidth = SPRITE_WIDTH;
            this.spriteHeight = SPRITE_HEIGHT;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 0;
            this.y = 0;
            this.scale = SCALE_FACTOR;
            this.minFrame = 0;
            this.frameY = 0;
            this.frameX = 0;
            this.maxFrame = 0;
            this.speed = -10;
        }

        setFrameLimit(limit) {
            this.maxFrame = limit;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        setSize(width, height) {
            this.spriteWidth = width;
            this.spriteHeight = height;
        }

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

        update() {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }

            this.x += this.speed;

            if (this.x + this.spriteWidth * this.scale < 0) {
                this.x = canvas.width;
            }
        }
    }

    const pinky = new Pinky();

    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            const animationInfo = animationData[selectedAnimation];
            if (animationInfo) {
                pinky.setFrameLimit(animationInfo.frameLimit);
                pinky.setSize(animationInfo.width, animationInfo.height);
            }
            switch (selectedAnimation) {
                case 'A':
                    pinky.frameY = 0;
                    break;
                case 'B':
                    pinky.frameY = 1;
                    break;
                case 'C':
                    pinky.frameY = 2;
                    break;
                case 'D':
                    pinky.frameY = 3;
                    break;
            }
        }
    });

    let lastTimestamp = 0;

    function animate(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        if (deltaTime >= FRAME_INTERVAL) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pinky.draw(ctx);
            pinky.update();
            lastTimestamp = timestamp;
        }
        requestAnimationFrame(animate);
    }

    animate();
});