/* Page Navigation Logic */
const heroPage = document.getElementById('heroPage');
const manualPage = document.getElementById('manualPage');
const enterBtn = document.getElementById('enterManualBtn');
const backHomeBtn = document.getElementById('backToHomeBtn');

enterBtn.addEventListener('click', () => {
  heroPage.classList.remove('active');
  heroPage.classList.add('hidden');
  
  manualPage.classList.remove('hidden');
  manualPage.classList.add('active');
  
  backHomeBtn.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backHomeBtn.addEventListener('click', () => {
  manualPage.classList.remove('active');
  manualPage.classList.add('hidden');
  
  heroPage.classList.remove('hidden');
  heroPage.classList.add('active');
  
  backHomeBtn.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Dark / Light Mode Switcher */
const themeBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

themeBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i> Theme' : '<i class="fas fa-sun"></i> Theme';
});

/* 3D Particle Canvas Background */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  draw() {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    const color = isDark ? '56, 189, 248' : '2, 132, 199';
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, 0.5)`;
    ctx.fill();
  }
}

for (let i = 0; i < 75; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  const lineColor = isDark ? '56, 189, 248' : '2, 132, 199';

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${lineColor}, ${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();