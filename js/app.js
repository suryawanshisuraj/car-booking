/**
 * Jay Bhavani Tours and Travels - Main Application Logic
 */
import { fleetData, popularRoutes } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initFleetTabs();
  initHeroBookingForm();
  initBookingModal();
  initPopularRoutes();
  initMobileMenu();
  initScrollNav();
  setDefaultDateTime();
  initClientRouting();
});

/* ==========================================================================
   1. Hero Background Slider
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const sliderNav = document.getElementById('hero-slider-nav');
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  // Create dot indicators
  if (sliderNav) {
    sliderNav.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetInterval();
      });
      sliderNav.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    const dots = document.querySelectorAll('.hero-dot');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  startInterval();

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => startInterval());
  }
}

/* ==========================================================================
   2. Fleet Tabs & Vehicle Rendering
   ========================================================================== */
function initFleetTabs() {
  const tabs = document.querySelectorAll('.fleet-tab');
  const resultsContainer = document.querySelector('.cards.fleet-results');
  if (!tabs.length || !resultsContainer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category || 'sedan';
      renderFleet(category);
    });
  });

  // Render initial sedan fleet
  renderFleet('sedan');
}

function renderFleet(categoryKey) {
  const resultsContainer = document.querySelector('.cards.fleet-results');
  if (!resultsContainer) return;

  const vehicles = fleetData[categoryKey] || fleetData.sedan;

  resultsContainer.innerHTML = vehicles.map(vehicle => `
    <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
      <div class="vehicle-image">
        <img alt="${vehicle.name}" loading="lazy" src="${vehicle.image}">
        <span class="vehicle-category">${vehicle.tag}</span>
      </div>
      <div class="vehicle-content">
        <h3>${vehicle.name}</h3>
        <p>${vehicle.description}</p>
        <div class="vehicle-meta">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            ${vehicle.seats}
          </span>
          <span>🧳 ${vehicle.bags}</span>
          <span>❄️ AC</span>
          <span style="margin-left: auto; color: var(--primary-dark); font-weight: 700;">${vehicle.ratePerKm}</span>
        </div>
        <button type="button" class="btn btn-dark full book-vehicle-btn" data-vehicle="${vehicle.name}" data-category="${vehicle.category}">
          Book ${vehicle.name}
        </button>
      </div>
    </div>
  `).join('');

  // Attach booking modal triggers
  resultsContainer.querySelectorAll('.book-vehicle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const vehicleName = btn.dataset.vehicle;
      openBookingModal({ vehicle: vehicleName });
    });
  });
}

/* ==========================================================================
   3. Quick Booking Launcher & Form (Hero Section)
   ========================================================================== */
function initHeroBookingForm() {
  const form = document.getElementById('hero-booking-form');
  const toggleBtn = document.getElementById('toggle-quick-form');
  const formWrapper = document.getElementById('quick-form-wrapper');
  const arrowIcon = document.getElementById('toggle-arrow-icon');
  const tripPills = document.querySelectorAll('.trip-pill');
  const tripTypeInput = form ? form.querySelector('input[name="tripType"]') : null;

  // 1. Big Interactive Button Trigger (Accordion / Launcher Toggle)
  if (toggleBtn && formWrapper) {
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = formWrapper.classList.toggle('collapsed');
      toggleBtn.setAttribute('aria-expanded', !isCollapsed);
      if (arrowIcon) {
        arrowIcon.textContent = isCollapsed ? '▼' : '▲';
        arrowIcon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
      }
      
      // If opening, autofocus the first input for convenience
      if (!isCollapsed && form) {
        const nameInput = form.querySelector('input[name="customerName"]');
        if (nameInput) setTimeout(() => nameInput.focus(), 250);
      }
    });
  }

  // 2. Interactive Trip Type Pills
  if (tripPills.length && tripTypeInput) {
    tripPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        tripPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const selectedType = pill.dataset.type || pill.textContent.trim();
        tripTypeInput.value = selectedType;
      });
    });
  }

  // 3. Form Submission
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = form.customerName.value.trim();
    const phone = form.phone.value.trim();
    const pickupLocation = form.pickupLocation.value.trim();
    const dropLocation = form.dropLocation.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const tripType = tripTypeInput ? tripTypeInput.value : 'One Way';

    if (!customerName || !phone || !pickupLocation || !dropLocation || !date || !time) {
      showToast('⚠️ Please fill in all booking details.', 'warning');
      return;
    }

    sendBookingToWhatsApp({
      customerName,
      phone,
      pickupLocation,
      dropLocation,
      date,
      time,
      tripType: tripType || 'One Way'
    });
  });
}

/* ==========================================================================
   4. Popular Routes Section
   ========================================================================== */
function initPopularRoutes() {
  const routesContainer = document.getElementById('popular-routes-list');
  if (!routesContainer) return;

  routesContainer.innerHTML = popularRoutes.map(route => `
    <div class="route-card">
      <div class="route-header">
        <span class="route-tag">${route.distance} • ${route.duration}</span>
        ${route.popular ? '<span style="font-size:0.75rem; font-weight:700; color:var(--primary-dark); background:var(--primary-light); padding:2px 8px; border-radius:12px;">🔥 Popular</span>' : ''}
      </div>
      <div class="route-destination">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>${route.from} ➔ ${route.to}</span>
      </div>
      <div class="route-details">
        <span>Sedan from <b>${route.sedanFare}</b></span>
        <span>•</span>
        <span>SUV from <b>${route.suvFare}</b></span>
      </div>
      <button type="button" class="btn btn-dark full route-book-btn" 
              data-from="${route.from}" 
              data-to="${route.to}">
        Book This Route
      </button>
    </div>
  `).join('');

  routesContainer.querySelectorAll('.route-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openBookingModal({
        pickup: btn.dataset.from,
        drop: btn.dataset.to,
        tripType: 'Outstation'
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Booking Modal Dialog
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const modalForm = document.getElementById('modal-booking-form');
  const openButtons = document.querySelectorAll('[href="/book"], .nav-book, .mobile-actions a:last-child');

  if (!modal) return;

  // Setup Light-Dismiss Fallback as per modern-web-guidance
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (isDialogContent) return;
      modal.close();
    });
  }

  // Open modal triggers
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  // Trip type toggle options in modal
  const tripOptions = modal.querySelectorAll('.trip-type-option');
  tripOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      tripOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const tripTypeInput = modal.querySelector('input[name="modalTripType"]');
      if (tripTypeInput) tripTypeInput.value = opt.dataset.type;
    });
  });

  // Modal Form Submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = modalForm.modalName.value.trim();
      const phone = modalForm.modalPhone.value.trim();
      const pickupLocation = modalForm.modalPickup.value.trim();
      const dropLocation = modalForm.modalDrop.value.trim();
      const date = modalForm.modalDate.value;
      const time = modalForm.modalTime.value;
      const vehicle = modalForm.modalVehicle.value;
      const tripType = modal.querySelector('input[name="modalTripType"]')?.value || 'One Way';
      const notes = modalForm.modalNotes?.value.trim() || '';

      if (!customerName || !phone || !pickupLocation || !dropLocation || !date || !time) {
        showToast('⚠️ Please fill in all required fields.', 'warning');
        return;
      }

      modal.close();

      sendBookingToWhatsApp({
        customerName,
        phone,
        pickupLocation,
        dropLocation,
        date,
        time,
        vehicle,
        tripType,
        notes
      });
    });
  }
}

export function openBookingModal(options = {}) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const modalForm = document.getElementById('modal-booking-form');
  if (modalForm) {
    if (options.pickup) modalForm.modalPickup.value = options.pickup;
    if (options.drop) modalForm.modalDrop.value = options.drop;
    if (options.vehicle) {
      const select = modalForm.modalVehicle;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(options.vehicle)) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }

  modal.showModal();
}

/* ==========================================================================
   6. WhatsApp Booking Message Generator
   ========================================================================== */
function sendBookingToWhatsApp(data) {
  const phone = "919529573880";

  const message = `*🚕 JAY BHAVANI TOURS AND TRAVELS - CAB BOOKING REQUEST*
----------------------------------------
👤 *Customer Name:* ${data.customerName}
📞 *Phone Number:* ${data.phone}
📍 *Pickup Location:* ${data.pickupLocation}
🏁 *Drop Location:* ${data.dropLocation}
📅 *Journey Date:* ${data.date}
⏰ *Pickup Time:* ${data.time}
🚗 *Vehicle Preference:* ${data.vehicle || 'Any (Best Available)'}
🛣️ *Trip Type:* ${data.tripType || 'Standard'}
${data.notes ? `📝 *Special Requests:* ${data.notes}\n` : ''}----------------------------------------
_Sent via Jay Bhavani Tours and Travels Web Booking_`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  showToast('🚀 Opening WhatsApp to confirm your ride...', 'success');

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 500);
}

/* ==========================================================================
   7. Mobile Menu Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
    }
  });
}

/* ==========================================================================
   8. Scroll Navigation Highlighting
   ========================================================================== */
function initScrollNav() {
  const navbar = document.querySelector('.navbar');
  const sections = [
    { id: 'home', path: '/' },
    { id: 'services', path: '/services' },
    { id: 'vehicles', path: '/vehicles' },
    { id: 'routes', path: '/routes' },
    { id: 'about', path: '/about' },
    { id: 'reviews', path: '/reviews' },
    { id: 'contact', path: '/contact' }
  ];
  const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

  window.addEventListener('scroll', () => {
    let currentPath = '/';
    let currentId = 'home';
    const scrollY = window.pageYOffset;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 30);
    }

    sections.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        const top = el.offsetTop - 140;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentId = item.id;
          currentPath = item.path;
        }
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || href === `/#${currentId}` || href === `#${currentId}` || (currentPath === '/' && href === '/')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  });
}

/* ==========================================================================
   9. Date & Time Defaults
   ========================================================================== */
function setDefaultDateTime() {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
    if (!input.value) input.value = today;
  });

  // Default time to +1 hour rounded
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(Math.floor(now.getMinutes() / 15) * 15).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach(input => {
    if (!input.value) input.value = formattedTime;
  });
}

/* ==========================================================================
   10. Toast Notifications
   ========================================================================== */
export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   11. Client-Side SPA Route Controller
   ========================================================================== */
function initClientRouting() {
  const routeMap = {
    '/': '#home',
    '/services': '#services',
    '/vehicles': '#vehicles',
    '/routes': '#routes',
    '/about': '#about',
    '/contact': '#contact',
    '/reviews': '#reviews'
  };

  function scrollToTarget(selector) {
    if (!selector) return;
    const target = document.querySelector(selector);
    if (target) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    }
  }

  // Intercept all link clicks for instant responsive transitions
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http:') || href.startsWith('https:')) {
      return;
    }

    if (href === '/book') {
      e.preventDefault();
      openBookingModal();
      try { history.pushState({ path: '/book' }, '', '/book'); } catch (_) {}
      return;
    }

    if (routeMap[href]) {
      e.preventDefault();
      scrollToTarget(routeMap[href]);
      try { history.pushState({ path: href }, '', href); } catch (_) {}

      document.querySelectorAll('.nav-links a:not(.btn)').forEach(a => {
        if (a.getAttribute('href') === href) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        } else {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
        }
      });
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(href);
      return;
    }
  });

  // Handle browser navigation (back/forward)
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    if (path === '/book') {
      openBookingModal();
    } else {
      const modal = document.getElementById('booking-modal');
      if (modal && modal.open) modal.close();
      if (routeMap[path]) {
        scrollToTarget(routeMap[path]);
      } else {
        scrollToTarget('#home');
      }
    }
  });

  // Handle direct navigation on page load
  const initialPath = window.location.pathname;
  if (initialPath === '/book') {
    setTimeout(() => openBookingModal(), 150);
  } else if (routeMap[initialPath]) {
    setTimeout(() => scrollToTarget(routeMap[initialPath]), 100);
  }
}
