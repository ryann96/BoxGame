---
toc: true
comments: true
layout: post
title: Midnight Stalker Animation
description:  This is level 2 in our game. This is how it looks separately. This is Midnight Ninja.
courses: { compsci: {week: 1} }
type: hacks
---

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="ninjaSprite" src="{{site.baseurl}}/images/midnightStalker.png"> 
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animation works -->
            <input type="radio" name="animation" id="A">
            <label for="walking">Jumping</label><br>
            <input type="radio" name="animation" id="B">
            <label for="walking">Sword Fighting</label><br>
            <input type="radio" name="animation" id="C">
            <label for="walking">Sword Strikes</label><br>
            <button id="throwBomb">Throw Bomb</button> <!-- Added a button to trigger bomb throwing -->
        </div>
    </div>
    <script>
        // start on page load
        window.addEventListener('load', function () {
            const canvas = document.getElementById('spriteContainer');
            const ctx = canvas.getContext('2d');
            const SPRITE_WIDTH = 30;  // matches sprite pixel width
            const SPRITE_HEIGHT = 30; // matches sprite pixel height
            const SCALE_FACTOR = 3;  // control size of sprite on canvas
            const FRAME_LIMIT = 5;  // number of frames per row, this code assumes each row is the same
            const DESIRED_FRAME_RATE = 8; // 8 frames per second
            const FRAME_INTERVAL = 1000 / DESIRED_FRAME_RATE;
            const BOMB_RADIUS = 5; // radius of the bomb
            const BOMB_SPEED = 8; // speed of the bomb
            const BOMB_DISTANCE = 100; // distance before bomb disappears
            canvas.width = SPRITE_WIDTH * SCALE_FACTOR * 8;
            canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;
            class Ninja {
                constructor() {
                    this.image = document.getElementById("ninjaSprite");
                    this.spriteWidth = SPRITE_WIDTH;
                    this.spriteHeight = SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = 0; // Initial x position
                    this.y = 0;
                    this.scale = SCALE_FACTOR;
                    this.minFrame = 0;
                    this.maxFrame = FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.velocityX = 6; // Horizontal velocity
                }
                // draw ninja object
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
                // update frameX of ninja object
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
            class Bomb {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.radius = BOMB_RADIUS;
                    this.speed = BOMB_SPEED;
                    this.distanceTravelled = 0; // to track the distance the bomb has traveled
                }
                // draw bomb object
                draw(context) {
                    context.beginPath();
                    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                    context.fillStyle = 'red';
                    context.fill();
                    context.closePath();
                }
                // update bomb object
                update() {
                    this.x += this.speed;
                    this.distanceTravelled += this.speed;
                    // Check if the bomb has reached the explosion point
                    if (this.distanceTravelled >= BOMB_DISTANCE) {
                        // Implement explosion logic here (you can add an explosion animation or effect)
                        console.log('Bomb exploded!');
                        // Remove the bomb from the array
                        bombs.splice(bombs.indexOf(this), 1);
                    }
                }
            }
            // ninja object
            const ninja = new Ninja();
            // bombs array
            const bombs = [];
            // update frameY of ninja object, action from idle, bark, walk radio control
            const controls = document.getElementById('controls');
            controls.addEventListener('click', function (event) {
                if (event.target.tagName === 'INPUT') {
                    const selectedAnimation = event.target.id;
                    switch (selectedAnimation) {
                        case 'A':
                            ninja.frameY = 2;
                            break;
                        case 'B':
                            ninja.frameY = 5;
                            break;
                        case 'C':
                            ninja.frameY = 6;
                            break;
                    }
                }
            });
            // throw bomb button
            const throwBombButton = document.getElementById('throwBomb');
            throwBombButton.addEventListener('click', function () {
                const bomb = new Bomb(ninja.x + ninja.width * ninja.scale, ninja.y + ninja.height * ninja.scale / 2);
                bombs.push(bomb);
            });
            let lastTimestamp = 0;
            // Animation recursive control function
            function animate(timestamp) {
                const deltaTime = timestamp - lastTimestamp;
                if (deltaTime >= FRAME_INTERVAL) {
                    // Clears the canvas to remove the previous frame.
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Draws the current frame of the ninja sprite.
                    ninja.draw(ctx);
                    // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
                    ninja.update();
                    // Draw and update bombs
                    bombs.forEach(bomb => {
                        bomb.draw(ctx);
                        bomb.update();
                    });
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
</body>


<br>
<br>
<br>

## BACKSTORY
>Once a renowned stealth expert, Midnight Stalker traded the shadows for a life of convenience. Fed up with the complexities of online shopping, he decided to take matters into his own hands—literally. Armed with a ninja's skills and a penchant for mischief, he became the ultimate package interceptor. His motives? To bring chaos to the doorsteps of unsuspecting citizens, one undelivered package at a time. Rumor has it he's fueled by a personal vendetta against the rise of automated deliveries, and now he's the cardboard-clad nemesis of every Amazon box on its journey to a happy home. 