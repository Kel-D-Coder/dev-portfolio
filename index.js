/* =========================================================
   Kelvin Okolo — portfolio interactions
   ========================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */
  var navLinks = document.getElementById('nav-links');
  var menuToggle = document.getElementById('menu-toggle');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('show');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var willOpen = !navLinks.classList.contains('show');
      navLinks.classList.toggle('show', willOpen);
      menuToggle.classList.toggle('is-open', willOpen);
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------------------------------------------------
     Header state, scroll progress, back-to-top, active link
     --------------------------------------------------------- */
  var header = document.getElementById('site-header');
  var progressBar = document.getElementById('scroll-progress');
  var backToTop = document.getElementById('back-to-top');
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = sectionLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (progressBar) {
      progressBar.style.width = (docHeight > 0 ? (y / docHeight) * 100 : 0) + '%';
    }
    if (backToTop) backToTop.classList.toggle('is-visible', y > window.innerHeight * 0.7);

    // Highlight the section currently in view
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= window.innerHeight * 0.35) {
        current = sections[i].id;
      }
    }
    sectionLinks.forEach(function (link) {
      link.classList.toggle('is-active', current !== null && link.getAttribute('href') === '#' + current);
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = parseInt(entry.target.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('is-revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Typed role in the hero
     --------------------------------------------------------- */
  var typedEl = document.getElementById('typed-role');
  var roles = [
    'full-stack web apps.',
    'fast React front ends.',
    'reliable Node.js APIs.',
    'products people ship.'
  ];

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = roles[0];
    } else {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;

      (function type() {
        var text = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typedEl.textContent = text.slice(0, charIndex);

        var delay = deleting ? 40 : 75;

        if (!deleting && charIndex === text.length) {
          delay = 1900;
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 320;
        }

        setTimeout(type, delay);
      })();
    }
  }

  /* ---------------------------------------------------------
     Animated stat counters
     --------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1600;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------------------------------------------------------
     3D tilt on cards
     --------------------------------------------------------- */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var maxTilt = card.classList.contains('project-card') ? 7 : 10;

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
          'perspective(900px) rotateX(' + (-py * maxTilt).toFixed(2) + 'deg)' +
          ' rotateY(' + (px * maxTilt).toFixed(2) + 'deg)' +
          ' translateY(-6px) scale(1.015)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });

    /* Hero photo follows the pointer across the whole hero */
    var photoStage = document.getElementById('photo-stage');
    var hero = document.querySelector('.hero');

    if (photoStage && hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        photoStage.style.transform =
          'rotateX(' + (-py * 14).toFixed(2) + 'deg) rotateY(' + (px * 14).toFixed(2) + 'deg)';
      });

      hero.addEventListener('mouseleave', function () {
        photoStage.style.transform = '';
      });
    }

    /* Magnetic buttons */
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + x * 0.22 + 'px, ' + y * 0.28 + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------
     Cursor glow
     --------------------------------------------------------- */
  var glow = document.getElementById('cursor-glow');
  if (glow && !isTouch && !prefersReducedMotion) {
    var glowX = window.innerWidth / 2;
    var glowY = window.innerHeight / 2;
    var targetX = glowX;
    var targetY = glowY;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    (function drift() {
      glowX += (targetX - glowX) * 0.12;
      glowY += (targetY - glowY) * 0.12;
      glow.style.transform = 'translate(' + glowX + 'px, ' + glowY + 'px)';
      window.requestAnimationFrame(drift);
    })();
  }

  /* ---------------------------------------------------------
     Project filters
     --------------------------------------------------------- */
  var filters = document.querySelectorAll('.filter');
  var projectCards = document.querySelectorAll('.project-card');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      projectCards.forEach(function (card) {
        var tags = card.getAttribute('data-tags') || '';
        var show = filter === 'all' || tags.split(/\s+/).indexOf(filter) !== -1;
        card.classList.toggle('is-hidden', !show);

        if (show && !prefersReducedMotion) {
          card.classList.remove('is-revealed');
          // Force a reflow so the reveal transition replays
          void card.offsetWidth;
          card.classList.add('is-revealed');
        }
      });
    });
  });

  /* ---------------------------------------------------------
     Contact form — opens the visitor's mail client
     --------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  // Note: `form.name` resolves to the form's own name property, not the input,
  // so the fields are looked up by id instead.
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');

  if (form && note && nameInput && emailInput && messageInput) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var message = messageInput.value.trim();
      var valid = true;

      [nameInput, emailInput, messageInput].forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle('has-error', empty);
        if (empty) valid = false;
      });

      if (!valid) {
        note.textContent = 'Please fill in every field.';
        note.className = 'form-note is-error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add('has-error');
        note.textContent = 'That email address does not look right.';
        note.className = 'form-note is-error';
        return;
      }

      var subject = 'Project enquiry from ' + name;
      var body = message + '\n\n—\n' + name + '\n' + email;
      var mailto =
        'mailto:okolochibundu887@gmail.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);

      window.location.href = mailto;

      note.textContent = 'Opening your email app — hit send and I will reply within 24 hours.';
      note.className = 'form-note is-success';
    });

    [nameInput, emailInput, messageInput].forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('has-error');
      });
    });
  }

  /* ---------------------------------------------------------
     Hero 3D scene (Three.js) — particle field + wireframe core
     --------------------------------------------------------- */
  function initHeroScene() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined' || prefersReducedMotion) return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2
      });
    } catch (err) {
      return; // No WebGL — the CSS background alone still looks fine
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 14;

    /* --- Particle field --- */
    var particleCount = window.innerWidth < 768 ? 900 : 2200;
    var positions = new Float32Array(particleCount * 3);
    var colors = new Float32Array(particleCount * 3);
    var violet = new THREE.Color(0x7c5cff);
    var cyan = new THREE.Color(0x22d3ee);
    var mixed = new THREE.Color();

    for (var i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 26;

      mixed.copy(violet).lerp(cyan, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    var particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    var particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        size: 0.075,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(particles);

    /* --- Wireframe core ---
       On wide screens it sits to the right, behind the portrait. On narrow
       screens the layout stacks, so it moves up and fades back to keep the
       headline readable. */
    var narrow = window.innerWidth < 768;

    var core = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(4.6, 1)),
      new THREE.LineBasicMaterial({
        color: 0x7c5cff,
        transparent: true,
        opacity: narrow ? 0.14 : 0.28
      })
    );
    core.position.set(narrow ? 0 : 4.5, narrow ? 4.5 : 0, narrow ? -8 : -4);
    scene.add(core);

    var innerCore = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.OctahedronGeometry(2.4, 0)),
      new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: narrow ? 0.22 : 0.45
      })
    );
    innerCore.position.copy(core.position);
    scene.add(innerCore);

    /* --- Pointer parallax --- */
    var pointerX = 0;
    var pointerY = 0;
    var currentX = 0;
    var currentY = 0;

    window.addEventListener(
      'mousemove',
      function (e) {
        pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true }
    );

    /* --- Resize --- */
    function resize() {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    /* --- Pause when the hero is off screen --- */
    var heroVisible = true;
    var heroSection = document.querySelector('.hero');
    if (heroSection && 'IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          heroVisible = entries[0].isIntersecting;
        },
        { threshold: 0 }
      ).observe(heroSection);
    }

    var clock = new THREE.Clock();

    function animate() {
      window.requestAnimationFrame(animate);
      if (!heroVisible) return;

      var t = clock.getElapsedTime();

      currentX += (pointerX - currentX) * 0.045;
      currentY += (pointerY - currentY) * 0.045;

      particles.rotation.y = t * 0.035 + currentX * 0.28;
      particles.rotation.x = currentY * 0.18;

      core.rotation.x = t * 0.12 + currentY * 0.25;
      core.rotation.y = t * 0.17 + currentX * 0.4;

      innerCore.rotation.x = -t * 0.22 + currentY * 0.3;
      innerCore.rotation.y = -t * 0.28 + currentX * 0.5;
      innerCore.scale.setScalar(1 + Math.sin(t * 0.9) * 0.07);

      camera.position.x += (currentX * 1.1 - camera.position.x) * 0.05;
      camera.position.y += (-currentY * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
    canvas.classList.add('is-ready');
  }

  if (document.readyState === 'complete') {
    initHeroScene();
  } else {
    window.addEventListener('load', initHeroScene);
  }
})();
