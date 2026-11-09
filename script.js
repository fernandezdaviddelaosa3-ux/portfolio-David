document.addEventListener('DOMContentLoaded', () => {

  // 1. MENÚ MÓVIL (Hamburguesa)
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // 2. EFECTO MÁQUINA DE ESCRIBIR (Typewriter)
  const textArray = [
    "Estudiante de 2º SMR",
    "Especializándome en Sistemas",
    "Técnico en Informática de Oficina",
    "Futuro Técnico Experto en IT"
  ];
  let textIndex = 0;
  let charIndex = 0;
  const typewriterElement = document.getElementById('typewriter');

  function type() {
    if (charIndex < textArray[textIndex].length) {
      typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 80);
    } else {
      setTimeout(erase, 2200);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 400);
    }
  }

  type();

  // 3. ANIMACIONES DE APARICIÓN AL HACER SCROLL (Scroll Reveal)
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // 4. EFECTO TILT (Inclinación 3D interactiva en tarjetas)
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 5. FONDO ANIMADO DE RED NEURONAL / PARTÍCULAS (Canvas)
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.5 + 1
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleCount; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.fill();

      for (let j = i + 1; j < particleCount; j++) {
        let p2 = particles[j];
        let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 - dist / 1300})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});