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
                this.appearInterval = 1000;
                this.lastAppearTime = 0;
                this.visible = true;
            }

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

            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }

                this.x += this.velocityX;

                if (this.x < -this.width * this.scale) {
                    this.x = canvas.width;
                }

                const currentTime = Date.now();
                if (currentTime - this.lastAppearTime >= this.appearInterval) {
                    this.visible = !this.visible;
                    this.lastAppearTime = currentTime;
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
    }
});
