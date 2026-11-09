document.addEventListener('DOMContentLoaded', () => {

  // 1. SISTEMA DE NAVEGACIÓN POR SECCIONES SIN DESPLAZAMIENTO (Tabs)
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const switchTabs = document.querySelectorAll('.switch-tab');

  function changeSection(targetId) {
    // Desactivar botones y ocultar secciones
    navButtons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));

    // Activar botón correspondiente
    const activeBtn = document.querySelector(`.nav-btn[data-section="${targetId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Mostrar sección con animación
    const activeSection = document.getElementById(targetId);
    if (activeSection) {
      activeSection.classList.add('active');
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-section');
      changeSection(sectionId);
    });
  });

  switchTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      changeSection(target);
    });
  });

  // 2. EFECTO MÁQUINA DE ESCRIBIR (Typewriter)
  const textArray = [
    "Estudiante de 2º SMR",
    "Futuro Técnico Experto en IT",
    "Apasionado de las Redes y Linux"
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
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }

  type();

  // 3. INCLINACIÓN 3D INTERACTIVA EN TARJETAS (Tilt Effect)
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 4. FONDO ANIMADO DE RED NEURONAL / PARTÍCULAS (Canvas)
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
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
      ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';
      ctx.fill();

      for (let j = i + 1; j < particleCount; j++) {
        let p2 = particles[j];
        let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.15 - dist / 1200})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});