/* ===============================================
  NAVEGACIÓN INTERACTIVA MEJORADA
  ===============================================
  
  Funcionalidades:
  1. Menú hamburguesa
  2. Scroll suave
  3. Indicador de progreso
  4. Animación de secciones
  5. Botón "volver arriba"
  6. Efecto scroll en navbar
  7. Filtrado de portafolio
   =============================================== */

// Seleccionar elementos
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const scrollIndicator = document.getElementById('scrollIndicator');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');

// ========== FUNCIONALIDAD DEL MENÚ ==========
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ========== EFECTO SCROLL EN NAVBAR ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== INDICADOR DE PROGRESO DE SCROLL ==========
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + "%";
});

// ========== BOTÓN "VOLVER ARRIBA" ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== ANIMACIÓN DE SECCIONES AL HACER SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas las secciones de contenido
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// ========== MARCAR ENLACE ACTIVO SEGÚN SCROLL ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === '' && href === '#inicio')) {
            link.classList.add('active');
        }
    });
});

// ========== FUNCIONALIDAD DE FILTRADO PARA PORTAFOLIO ==========
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase activa al botón clickeado
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}