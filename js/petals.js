/**
 * Falling Rose Petals & Floating Hearts Particle Engine
 * Romantic Couple & Memory Keepsake Edition
 */

(function () {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = window.innerWidth < 768 ? 26 : 48;

  let mouseX = width / 2;
  let mouseY = height / 2;
  let mouseActive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouseActive = false;
  });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30 - Math.random() * 40;
      this.isHeart = Math.random() > 0.6; // 40% chance of small heart
      this.size = this.isHeart ? 9 + Math.random() * 9 : 11 + Math.random() * 13;
      this.speedY = 0.9 + Math.random() * 1.4;
      this.speedX = (Math.random() - 0.5) * 1.1;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2;
      this.flip = Math.random() * 360;
      this.flipSpeed = (Math.random() * 2 + 1) * 0.03;
      this.opacity = 0.45 + Math.random() * 0.45;

      const colors = [
        { r: 254, g: 205, b: 211 }, // soft rose pink
        { r: 251, g: 113, b: 133 }, // rose 400
        { r: 244, g: 63, b: 94 },   // rose 500
        { r: 249, g: 168, b: 212 }, // pink 300
        { r: 255, g: 182, b: 193 }  // light pink
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.012) * 0.8;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;

      if (mouseActive) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const force = (110 - dist) / 110;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 2;
        }
      }

      if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(1, Math.sin(this.flip));

      if (this.isHeart) {
        // Draw heart shape
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(
          0, 0,
          -this.size / 2, 0,
          -this.size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          -this.size / 2, (this.size + topCurveHeight) / 2,
          0, (this.size + topCurveHeight) / 1.4,
          0, this.size
        );
        ctx.bezierCurveTo(
          0, (this.size + topCurveHeight) / 1.4,
          this.size / 2, (this.size + topCurveHeight) / 2,
          this.size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
          this.size / 2, 0,
          0, 0,
          0, topCurveHeight
        );
        ctx.closePath();
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.85})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
        ctx.fill();
      } else {
        // Draw rose petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -this.size * 0.6,
          -this.size * 0.4,
          -this.size * 0.5,
          -this.size * 1.2,
          0,
          -this.size * 1.2
        );
        ctx.bezierCurveTo(
          this.size * 0.5,
          -this.size * 1.2,
          this.size * 0.6,
          -this.size * 0.4,
          0,
          0
        );

        const gradient = ctx.createRadialGradient(
          0,
          -this.size * 0.6,
          0,
          0,
          -this.size * 0.6,
          this.size
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`
        );
        gradient.addColorStop(
          1,
          `rgba(${Math.max(0, this.color.r - 25)}, ${Math.max(
            0,
            this.color.g - 25
          )}, ${Math.max(0, this.color.b - 25)}, ${this.opacity * 0.75})`
        );

        ctx.fillStyle = gradient;
        ctx.fill();

        // Vein highlight
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(0, -this.size * 0.6, 0, -this.size * 1.1);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // Romantic Sparkles
  class Sparkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.7;
      this.speed = Math.random() * 0.02 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      this.angle += this.speed;
      this.opacity = (Math.sin(this.angle) + 1) * 0.35;
      this.y -= 0.25;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 241, 190, ${this.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 220, 140, 0.8)';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  const sparkles = [];
  for (let i = 0; i < 22; i++) {
    sparkles.push(new Sparkle());
  }

  let isRunning = true;
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning) loop();
  });

  function loop() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(loop);
  }

  loop();
})();
