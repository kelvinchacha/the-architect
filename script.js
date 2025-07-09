document.addEventListener('DOMContentLoaded', () => {
  // === 1. NAV ACTIVE LINK ===
  const links = document.querySelectorAll('.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // === 2. HERO ANIMATIONS ===
  if (document.querySelector('.hero')) {
    gsap.from(".hero-title", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 0.3,
      ease: "power3.out"
    });
    gsap.from(".hero-quote", {
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out"
    });
  }

  // === 3. SCROLL ANIMATIONS ===
  const fadeIns = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  fadeIns.forEach(el => {
    gsap.set(el, { opacity: 0, y: 20 });
    observer.observe(el);
  });

  // === 4. CONTACT MODAL (Optional if used) ===
  const modalBtn = document.querySelector('.contact-popup-btn');
  const modal = document.querySelector('.contact-modal');
  const modalClose = document.querySelector('.modal-close');

  if (modalBtn && modal && modalClose) {
    modalBtn.addEventListener('click', () => {
      modal.classList.add('open');
      gsap.fromTo(modal, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 });
    });

    modalClose.addEventListener('click', () => {
      gsap.to(modal, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        onComplete: () => modal.classList.remove('open')
      });
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modalClose.click();
      }
    });
  }
});

// Initialize EmailJS
  emailjs.init("009rC0wl7-OsGSgdl");

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = "Sending...";

    emailjs.sendForm('service_39h4wuf', 'template_b7ifxxm', this)
      .then(() => {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      }, (err) => {
        console.error(err);
        status.textContent = "❌ Failed to send message. Try again.";
      });
  });

  // Nav active link highlight
  const links = document.querySelectorAll('.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
