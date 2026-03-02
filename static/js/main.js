// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animação de entrada ao rolar (Intersection Observer)
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar animação a cards e seções
document.querySelectorAll(
  '.card-benefit, .contato-card, .app-pill, .cta-final, .plan-card, .streaming-item, .canal-pill'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Adicionar classe visible quando elemento entra na tela
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});

// Navbar com sombra ao rolar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(102,0,153,0.10)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Funcionalidade das abas de categoria
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      
      // Remover classe active de todos os botões e conteúdos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Adicionar classe active ao botão clicado e seu conteúdo
      btn.classList.add('active');
      document.getElementById(tabName).classList.add('active');
      
      // Scroll suave para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
