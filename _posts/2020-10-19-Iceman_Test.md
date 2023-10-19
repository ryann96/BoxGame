---
toc: true
comments: false
layout: post
title: Iceman Test
description: Testing New Code for Iceman
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
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 52.54;
        const SPRITE_HEIGHT = 95;
        const SCALE_FACTOR = 2;
        const FRAME_LIMIT = 22;

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR * 8;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        const icemanImage = new Image();
        icemanImage.src = "{{site.baseurl}}/images/Iceman flipped.png";

        icemanImage.onload = function () {
            class Iceman {
                constructor() {
                    this.image = icemanImage;
                    this.spriteWidth = SPRITE_WIDTH;
                    this.spriteHeight = SPRITE_HEIGHT;
                    this.width = this.spriteWidth;
                    this.height = this.spriteHeight;
                    this.x = canvas.width;
                    this.y = 0;
                    this.scale = SCALE_FACTOR;
                    this.minFrame = 0;
                    this.maxFrame = FRAME_LIMIT;
                    this.frameX = 0;
                    this.frameY = 0;
                    this.velocityX = -7;
                    this.appearInterval = Math.random() * 5000 + 1000;
                    this.lastAppearTime = 0;
                }

                draw(context) {
                    context.drawImage(
                        this.image,
                        this.frameX * this.spriteWidth,
                        this.frameY * this.spriteHeight,
                        this.spriteWidth,
                        this.spriteHeight,
                        this.x + Math.random() * 10 - 5, // Add random x position offset
                        this.y + Math.random() * 10 - 5, // Add random y position offset
                        this.width * this.scale + Math.random() * 4 - 2, // Add random width offset
                        this.height * this.scale + Math.random() * 4 - 2 // Add random height offset
                    );
                }

                update() {
                    if (this.frameX < this.maxFrame) {
                        this.frameX++;
                    } else {
                        this.frameX = 0;
                    }

                    this.x += this.velocityX;

                    if (this.x > canvas.width) {
                        this.x = -this.width * this.scale;
                    }

                    if (Math.random() < 0.05) {
                        this.appearInterval = Math.random() * 5000 + 1000;
                    }
                }
            }

            const iceman = new Iceman();

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                iceman.draw(ctx);
                iceman.update();
                setTimeout(function () {
                    requestAnimationFrame(animate);
                }, 50);
            }

            animate();
        };
    });
</script>
</html>