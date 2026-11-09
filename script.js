document.addEventListener('DOMContentLoaded', () => {

  // 1. MENÚ MÓVIL
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

  // 2. MÁQUINA DE ESCRIBIR
  const textArray = [
    "Administración de Sistemas",
    "Redes & Ciberseguridad",
    "Automatización & Scripting",
    "Técnico Informático"
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

  // 3. ANIMACIONES Y EVENTOS DE SCROLL
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const revealElements = document.querySelectorAll('.reveal');
  const parallaxTarget = document.querySelector('.parallax-target');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 3.1 Barra de progreso de lectura superior
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // 3.2 Cambio del menú al hacer scroll
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 3.3 Efecto Parallax en la portada
    if (parallaxTarget && scrollTop < window.innerHeight) {
      parallaxTarget.style.transform = `translateY(${scrollTop * 0.3}px)`;
      parallaxTarget.style.opacity = 1 - (scrollTop / (window.innerHeight * 0.8));
    }

    // 3.4 Scroll Reveal por sección
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  });

  // Disparar Scroll Reveal una vez al cargar
  window.dispatchEvent(new Event('scroll'));

  // 4. EFECTO TILT (3D) EN TARJETAS
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
      const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 5. FONDO ANIMADO CANVAS (Red Tecnológica con mayor brillo y visibilidad)
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 65; // Más partículas para que se note más lleno

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1
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
      ctx.fillStyle = 'rgba(56, 189, 248, 0.55)'; // Partículas mucho más visibles
      ctx.fill();

      for (let j = i + 1; j < particleCount; j++) {
        let p2 = particles[j];
        let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.28 - dist / 500})`; // Líneas más marcadas
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});