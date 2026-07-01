/* =========================================================
   UDI GLOBAL — MAIN JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScrollState();
  initScrollReveal();
  initActiveNavHighlight();
  initProgressBars();
  initTestimonialCarousel();
  initFaqAccordion();
  initBackToTop();
  initContactForm();
  initNewsletterForm();
  setCurrentYear();
});

/* ---------------------------------------------------------
   Mobile menu toggle
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // close menu when a link inside is clicked
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/*---------------------------------------------
----------------------------------------------*/
window.addEventListener("load", function () {

    const loader = document.getElementById("preloader");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        loader.classList.add("preloader-hide");

        document.body.style.overflow = "auto";

    }, 1800);

});
/*---------------------------------------------
----------------------------------------------*/


/* ---------------------------------------------------------
   Header shadow / state on scroll (kept subtle since header
   already has a permanent translucent background)
--------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 12) {
      header.style.boxShadow = '0 8px 24px rgba(11, 31, 58, 0.10)';
    } else {
      header.style.boxShadow = '';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------
   Scroll reveal (IntersectionObserver)
--------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-up, .reveal-fade');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger slightly based on position within its parent grid
          const delay = (entry.target.dataset.revealDelay || 0);
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, i) => {
    // small stagger for elements that share a direct parent (cards in a grid)
    el.dataset.revealDelay = String((i % 6) * 60);
    observer.observe(el);
  });
}

/* ---------------------------------------------------------
   Highlight active nav link based on section in view
--------------------------------------------------------- */
function initActiveNavHighlight() {
  const sections = ['home', 'about', 'services', 'blogs', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isMatch);
    });
  };

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   Animate capability progress bars when in view
--------------------------------------------------------- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const animate = (bar) => {
    const width = bar.dataset.width || '0';
    requestAnimationFrame(() => {
      bar.style.width = `${width}%`;
    });
  };

  if (!('IntersectionObserver' in window)) {
    bars.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------
   Testimonial carousel
--------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const dots = Array.from(dotsWrap.children);
  let index = 0;
  let autoplayTimer = null;

  // how many slides are visible depends on viewport — but we move one
  // card-width at a time based on the first slide's rendered width.
  const getSlideWidth = () => slides[0].getBoundingClientRect().width;

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    const offset = -(index * getSlideWidth());
    track.style.transform = `translateX(${offset}px)`;
    dots.forEach((dot, di) => dot.classList.toggle('active', di === index));
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      restartAutoplay();
    });
  });

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goTo(index + 1), 6000);
  }

  window.addEventListener('resize', () => goTo(index));

  goTo(0);
  restartAutoplay();
}

/* ---------------------------------------------------------
   FAQ accordion
--------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const toggleIcon = item.querySelector('.faq-toggle');

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // close all others (single-open accordion, matches original behaviour)
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-toggle').classList.remove('faq-toggle-open');
        }
      });

      item.classList.toggle('open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      toggleIcon.classList.toggle('faq-toggle-open', !isOpen);
    });
  });
}

/* ---------------------------------------------------------
   Back to top button
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   Contact form — submits to FormSubmit.co via fetch so we
   can show inline success/error state without leaving page.
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !status || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent — we'll be in touch shortly.";
        status.classList.add('success');
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong sending your message. Please email us directly at developer.udi@gmail.com.';
      status.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
    }
  });
}

// function initContactForm() {

// const form = document.getElementById('contactForm');
// const status = document.getElementById('formStatus');
// const submitBtn = document.getElementById('submitBtn');

// if (!form) return;

// form.addEventListener('submit', async function (e) {

// e.preventDefault();

// const btnText =
// submitBtn.querySelector('.btn-text');

// submitBtn.disabled = true;

// if (btnText)
// btnText.textContent = 'Sending...';

// status.textContent = '';

// try {

// const response =
// await fetch(form.action, {

// method: 'POST',

// body: new FormData(form),

// headers: {
// Accept: 'application/json'
// }

// });

// if (response.ok) {

// status.textContent =
// 'Message sent successfully';

// status.className =
// 'form-status success';

// form.reset();

// } else {

// throw new Error();

// }

// } catch {

// status.textContent =
// 'Failed to send message';

// status.className =
// 'form-status error';

// }

// submitBtn.disabled = false;

// if (btnText)
// btnText.textContent =
// 'Send Message';

// });

// }

// initContactForm();

/* ---------------------------------------------------------
   Newsletter form (footer) — simple client-side acknowledgement
--------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      input.value = '';
      input.placeholder = 'Thanks for subscribing!';
      setTimeout(() => { input.placeholder = 'you@company.com'; }, 3500);
    }
  });
}

/* ---------------------------------------------------------
   Footer year
--------------------------------------------------------- */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = String(new Date().getFullYear());
}



