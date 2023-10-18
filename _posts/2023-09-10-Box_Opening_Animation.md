---
toc: true
comments: false
layout: post
title: Box Opening Animation
description: complete
type: hacks
courses: { compsci: {week: 1} }
---

<body>
    <div>
        <canvas id="spriteContainer">
        </canvas>
    </div>
</body>

<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 53.67; 
        const SPRITE_HEIGHT = 81;
        const SCALE_FACTOR = 2; 
        const FRAME_LIMIT = 14;

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        const boxopenImage = new Image();

        boxopenImage.src = "{{site.baseurl}}/images/box_opening.png";

        boxopenImage.onload = function () {
            class Boxopen {
                constructor() {
                    this.image = boxopenImage; 
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

            const boxopen = new Boxopen();

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                boxopen.draw(ctx);
                boxopen.update();
                setTimeout(function () {
                    requestAnimationFrame(animate);
                }, 50); 
            }
            animate();
        };
    });
</script>
