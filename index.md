---
layout: default
title: Delveries
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
                <img id="platform" src="{{site.baseurl}}/images/platform.png"> 
                <img id="ninjaSprite" src="{{site.baseurl}}/images/midnightStalker.png">
        </canvas>
    </div>
</body>

<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('playerCanvas');
        const ctx = canvas.getContext('2d');
        const BOX_SPRITE_WIDTH = 71.75;
        const BOX_SPRITE_HEIGHT = 82.5;
        const BOX_SCALE_FACTOR = 2;
        const DESIRED_FRAME_RATE = 15;
        const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
        const PLATFORM_SPRITE_WIDTH = 362.25; 
        const PLATFORM_SPRITE_HEIGHT = 377;
        const PLATFORM_SCALE_FACTOR = 0.25;  
        const PLATFORM_FRAME_LIMIT = 4;  
        const NINJA_SPRITE_WIDTH = 30;
        const NINJA_SPRITE_HEIGHT = 30;
        const NINJA_SCALE_FACTOR = 4;
        const NINJA_FRAME_LIMIT = 5;
        const NINJA_DESIRED_FRAME_RATE = 8;
        const NINJA_FRAME_INTERVAL = 1000 / NINJA_DESIRED_FRAME_RATE;
        const BOMB_RADIUS = 5;
        const BOMB_SPEED = 20;
        const BOMB_DISTANCE = 200;
        const BOMB_THROW_INTERVAL = 5000; // 5 seconds
        const ICEMAN_SPRITE_WIDTH = 52.54;  // matches sprite pixel width
        const ICEMAN_SPRITE_HEIGHT = 95; // matches sprite pixel height
        const ICEMAN_SCALE_FACTOR = 2;  // control size of sprite on canvas
        const ICEMAN_FRAME_LIMIT = 22;  // number of frames per row, this code assumes each row is the same
        canvas.width = BOX_SPRITE_WIDTH * BOX_SCALE_FACTOR*6;
        canvas.height = BOX_SPRITE_HEIGHT * BOX_SCALE_FACTOR*3;

        class Box {
            constructor() {
                this.image = document.getElementById("box");
                this.spriteWidth = BOX_SPRITE_WIDTH;
                this.spriteHeight = BOX_SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 300;
                this.scale = BOX_SCALE_FACTOR;
                this.minFrame = 0;
                this.frameY = 0;
                this.frameX = 0;
                this.maxFrame = 7;
                this.speed = 10; 
                this.gravity = 0; // Gravity value
                this.onPlatform = false; // Flag to track if on platform
            }
            setFrameLimit(limit) {
                this.maxFrame = limit;
            }
            setPosition(x, y) {
                this.x = x;
                this.y = y;
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

                if (!this.onPlatform) {
                    this.y += this.gravity; // Apply gravity
                }
            }
            checkCollision(platform) {
                const isColliding = (
                    this.x < platform.x + platform.width * platform.scale &&
                    this.x + this.width * this.scale > platform.x &&
                    this.y < platform.y + platform.height * platform.scale &&
                    this.y + this.height * this.scale > platform.y
                );

                this.onPlatform = isColliding; // Update onPlatform flag

                return isColliding;
            }
        }
        class Platform {
            constructor() {
                this.image = document.getElementById("platform");
                this.spriteWidth = PLATFORM_SPRITE_WIDTH;
                this.spriteHeight = PLATFORM_SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 200;
                this.y = 400;
                this.scale = PLATFORM_SCALE_FACTOR;
                this.minFrame = 0;
                this.maxFrame = PLATFORM_FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
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
            }
        }
        class Ninja {
            constructor() {
                this.image = document.getElementById("ninjaSprite");
                this.spriteWidth = NINJA_SPRITE_WIDTH;
                this.spriteHeight = NINJA_SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 350;
                this.scale = NINJA_SCALE_FACTOR;
                this.minFrame = 0;
                this.maxFrame = NINJA_FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 2;
                this.velocityX = 6;
                this.animationCounter = 0;
                this.animationLimit = 2; // Change this to control the number of times each animation should run
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
                    this.animationCounter++;
                    if (this.animationCounter >= this.animationLimit) {
                        this.animationCounter = 0;
                        switch (this.frameY) {
                            case 2:
                                this.frameY = 5; // Switch to Sword Fighting
                                break;
                            case 5:
                                this.frameY = 6; // Switch to Sword Strikes
                                break;
                            case 6:
                                this.frameY = 2; // Switch back to Jumping
                                break;
                        }
                    }
                }
                this.x += this.velocityX;
                if (this.x > canvas.width) {
                    this.x = -this.width * this.scale;
                }
            }
        }
        class Bomb {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = BOMB_RADIUS;
                this.speed = BOMB_SPEED;
                this.distanceTravelled = 0;
                this.color = 'black';
            }
            draw(context) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                context.fillStyle = this.color;
                context.fill();
                context.closePath();
            }
            update() {
                this.x += this.speed;
                this.distanceTravelled += this.speed;
                if (this.distanceTravelled >= BOMB_DISTANCE) {
                    bombs.splice(bombs.indexOf(this), 1);
                } else if (this.distanceTravelled >= 180) {
                    this.color = 'orange';
                    this.radius = BOMB_RADIUS * 2.5;
                }
            }
        }
        const icemanImage = new Image();
        // Set the src attribute
        icemanImage.src = "{{site.baseurl}}/images/Iceman-flipped.png"; // Change the image path here
        // Wait for the image to load
        icemanImage.onload = function () {
            class Iceman {
                constructor() {
                    this.image = icemanImage; // Use the loaded image
                    this.spriteWidth = ICEMAN_SPRITE_WIDTH;
                    this.spriteHeight = ICEMAN_SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = canvas.width; // Start from the right edge of the canvas
                    this.y = 0;
                    this.scale = ICEMAN_SCALE_FACTOR;
                    this.minFrame = 0;
                    this.maxFrame = ICEMAN_FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.velocityX = -7; // Negative value to move from right to left
                    this.appearInterval = 1000; // Initial appearance interval of 3 seconds
                    this.lastAppearTime = 0;
                    this.visible = true; // A flag to control sprite visibility
                }
                // Draw the Iceman object
                draw(context) {
                    if (this.visible) {
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
                }
                // Update frameX of the object
                update() {
                    if (this.frameX < this.maxFrame) {
                        this.frameX++;
                    } else {
                        this.frameX = 0;
                    }
                    // Update x position for horizontal movement
                    this.x += this.velocityX;
                    // Reset x position if it goes beyond the canvas
                    if (this.x < -this.width * this.scale) {
                        this.x = canvas.width;
                    }
                    // Check if it's time to make the sprite disappear
                    const currentTime = Date.now();
                    if (currentTime - this.lastAppearTime >= this.appearInterval) {
                        this.visible = !this.visible; // Toggle sprite visibility
                        this.lastAppearTime = currentTime; // Update the last appearance time
                    }
                }
            }
            // Iceman object
            const iceman = new Iceman();
            // Animation recursive control function
            function animateIceman() {
                // Clears the canvas to remove the previous frame.
                ctx.clearRect(iceman.x, iceman.y, iceman.width * iceman.scale, iceman.height * iceman.scale);
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
            animateIceman();
        };
        const ninja = new Ninja();
        const bombs = [];
        function throwBomb() {
            const bomb = new Bomb(ninja.x + ninja.width * ninja.scale, ninja.y + ninja.height * ninja.scale / 2);
            bombs.push(bomb);
        }
        function automaticBombThrow() {
            throwBomb(); // Throw a bomb initially
            setInterval(throwBomb, BOMB_THROW_INTERVAL);
        }
        automaticBombThrow(); // Start the automatic bomb throwing
        const box = new Box();
        const platform = new Platform();

        const keyState = {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
        };

        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'w':
                    keyState.ArrowUp = true;
                    break;
                case 'a':
                    keyState.ArrowLeft = true;
                    break;
                case 'd':
                    keyState.ArrowRight = true;
                    break;
            }
        });

        document.addEventListener('keyup', function (event) {
            switch (event.key) {
                case 'w':
                    keyState.ArrowUp = false;
                    break;
                case 'a':
                    keyState.ArrowLeft = false;
                    break;
                case 'd':
                    keyState.ArrowRight = false;
                    break;
            }
        });

        function updateAnimations() {
            let selectedAnimation = 'A';
            box.frameY = 0;
            if (keyState.ArrowLeft) {
                box.x -= box.speed;
            }
            if (keyState.ArrowRight) {
                box.x += box.speed;
            }
            if (keyState.ArrowUp) {
                selectedAnimation = 'B';
                box.frameY = 1;
            } 
        }

        let lastTimestamp = 0;
        function animate(timestamp) {
            const deltaTime = timestamp - lastTimestamp;
            if (deltaTime >= FRAME_INTERVAL) {
                ctx.clearRect(box.x, box.y, box.width * box.scale, box.height * box.scale);
                ctx.clearRect(ninja.x, ninja.y, ninja.width * ninja.scale, ninja.height * ninja.scale);
                if (box.checkCollision(platform)) {
                    box.y = platform.y - box.height * box.scale;
                    platform.y = box.y + box.height * box.scale;
                } else {
                    box.onPlatform = false; 
                }
                box.draw(ctx);
                box.update();
                updateAnimations();
                ninja.draw(ctx);
                ninja.update();
                bombs.forEach(bomb => {
                    bomb.draw(ctx);
                    bomb.update();
                });
                lastTimestamp = timestamp;
            }

            requestAnimationFrame(animate);
        }
        animate();
        let animationHasRun = false;
        let platformAnimationFinished = false;

        function animatePlatform() {
            if (!platformAnimationFinished) {
                ctx.clearRect(platform.x, platform.y, platform.width, platform.height);
                platform.draw(ctx);
                platform.update();

                if (platform.frameX === platform.maxFrame) {
                    platformAnimationFinished = true;
                }

                if (!platformAnimationFinished) {
                    setTimeout(function () {
                        requestAnimationFrame(animatePlatform);
                    }, 100); 
                }
            }
        }
        if (box.frameX*box.scale == 0){
            if (!animationHasRun) {
                animationHasRun = true;
                platformAnimationFinished = false;
                animatePlatform();
            }
        }
    });
</script>