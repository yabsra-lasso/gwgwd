document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80;

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.reset();
        }

        reset() {
            // Randomly decide if it's a leaf or dust
            this.type = Math.random() > 0.4 ? 'dust' : 'leaf';

            // Initial velocity
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;

            if (this.type === 'leaf') {
                this.size = Math.random() * 5 + 3; // Size 3-8
                this.angle = Math.random() * Math.PI * 2;
                this.va = (Math.random() - 0.5) * 0.02; // Angular velocity

                // Leaf colors: varied autumn/earth tones
                const colors = [
                    'rgba(139, 94, 60, 0.6)',   // Brown
                    'rgba(85, 107, 47, 0.5)',   // Olive
                    'rgba(160, 82, 45, 0.6)',   // Sienna
                    'rgba(218, 165, 32, 0.5)'   // Goldenrod
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            } else {
                // Dust
                this.size = Math.random() * 2 + 0.5; // Size 0.5-2.5
                this.color = 'rgba(200, 200, 200, 0.3)'; // Airy white/grey
                this.angle = 0;
                this.va = 0;
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.type === 'leaf') {
                this.angle += this.va;
                // Add slight wobble to leaves
                this.x += Math.sin(this.angle) * 0.1;
                this.y += Math.cos(this.angle) * 0.1;
            }

            // Wrap around edges instead of bounce for a more natural flow
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();

            if (this.type === 'leaf') {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                // Draw leaf shape (ellipse)
                ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else {
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const p = new Particle();
            particles.push(p);
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        // optionally reset particles on resize, or just let them be
    });

    init();
});
