// Page ready
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

// Footer year
const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('active'));
}

// Cursor light
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, { passive: true });
  document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });
}

// Navbar + progress + active links
const navbar = document.querySelector('.navbar');
const progress = document.querySelector('.scroll-progress span');
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'];

function onScroll() {
  const y = window.scrollY;
  if (navbar) navbar.classList.toggle('scrolled', y > 18);

  if (progress) {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  }

  let current = '';
  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && y >= section.offsetTop - 220) current = `#${id}`;
  });

  navAnchors.forEach((a) => {
    a.classList.toggle('active-link', a.getAttribute('href') === current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Typing animation
const typedRole = document.getElementById('typed-role');
const roles = [
  'Java + Spring Boot',
  'REST API Engineering',
  'JDBC + SQL',
  'Backend Architecture',
  'Clean, maintainable systems'
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typedRole) return;
  const current = roles[roleIndex];

  if (!deleting) {
    typedRole.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length + 10) deleting = true;
  } else {
    typedRole.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 42 : 72);
}
if (typedRole) typeEffect();

// Animated statistics
const statCards = document.querySelectorAll('.stat-card');
if ('IntersectionObserver' in window && statCards.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.animated === 'true') return;
      entry.target.dataset.animated = 'true';

      const value = Number(entry.target.dataset.count || 0);
      const decimals = Number(entry.target.dataset.decimals || 0);
      const suffix = entry.target.dataset.suffix || '';
      const output = entry.target.querySelector('h2');
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = value * eased;
        output.textContent = `${current.toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  statCards.forEach((card) => statObserver.observe(card));
}

// Subtle magnetic buttons
const magneticButtons = document.querySelectorAll('.magnetic');
magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });
  button.addEventListener('mouseleave', () => { button.style.transform = ''; });
});

// Project tilt — intentionally subtle for professionalism
const cards = document.querySelectorAll('.project-card');
cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(max-width: 860px)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-9px) perspective(900px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.6).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Project data
const projects = {
  fraud: {
    title: 'Fraud Detection & Risk Monitoring System',
    category: 'Power BI Dashboard',
    tech: ['Power BI', 'Analytics', 'Dashboard', 'Risk Monitoring'],
    description: 'Interactive Power BI dashboard designed to monitor suspicious activity, risk patterns, KPI changes, alerts, and business-level fraud insights through clean visual analytics.',
    features: [
      'KPI tracking and fraud risk monitoring',
      'Interactive filters and slicers',
      'Conditional formatting for alert zones',
      'Clean business-ready dashboard layout'
    ],
    github: 'https://github.com/AtharvaKedar123/PowerBi_Dashboards/tree/main/Inventory%20Optimization%20%26%20Demand%20Forecast%20Dashboard',
    bar: [88, 84, 92, 80], pie: [55, 30, 15], labels: ['KPIs', 'Insights', 'Visuals', 'Filters']
  },
  stock: {
    title: 'Real-Time Stock Trading Simulator', category: 'Java OOP Project',
    tech: ['Java', 'OOP', 'Simulation', 'Trading'],
    description: 'Java-based stock trading simulator that allows users to buy and sell stocks, track portfolio value, calculate profit/loss, and simulate real-world market movement using clean OOP design.',
    features: ['Buy and sell order execution', 'Portfolio value tracking', 'Profit and loss calculation', 'Clean object-oriented architecture'],
    github: 'https://github.com/AtharvaKedar123/Java_Programming_Projects_OOP_Edition/tree/master/Real_Time_Stock_Trading_Simulator_OOP',
    bar: [90, 86, 88, 82], pie: [50, 35, 15], labels: ['OOP', 'Trading', 'Analytics', 'Simulation']
  },
  lru: {
    title: 'LRU Cache Implementation (O(1))', category: 'Java DSA Project',
    tech: ['Java', 'DSA', 'HashMap', 'Doubly Linked List'],
    description: 'High-performance Least Recently Used cache built using HashMap and Doubly Linked List to achieve O(1) time complexity for get and put operations.',
    features: ['O(1) get and put operations', 'Efficient least-recently-used eviction policy', 'HashMap and Doubly Linked List design', 'Real-world caching system logic'],
    github: 'https://github.com/AtharvaKedar123/Data_structure_And_Algorithms_With_JAVA/tree/main/LRU%20Cache%20Implementation',
    bar: [98, 95, 90, 86], pie: [50, 35, 15], labels: ['Performance', 'DSA', 'Memory', 'Design']
  },
  traffic: {
    title: 'Smart Traffic Control System', category: 'Python OOP Project',
    tech: ['Python', 'OOP', 'Simulation', 'Automation'],
    description: 'Python OOP-based traffic control simulation that adjusts signal timings based on vehicle density and supports emergency vehicle priority.',
    features: ['Dynamic signal timing', 'Emergency vehicle priority', 'Sensor-based traffic monitoring', 'Scalable OOP structure'],
    github: 'https://github.com/AtharvaKedar123/Python_Programming_Projects_OOP_Edition/tree/master/Smart_Traffic_System_OOP',
    bar: [87, 90, 80, 85], pie: [45, 35, 20], labels: ['OOP', 'Logic', 'Simulation', 'Scalability']
  },
  bot: {
    title: 'Bitcoin Alert Bot', category: 'Java Backend Project',
    tech: ['Java', 'Maven', 'REST API', 'Telegram API', 'CoinGecko API'],
    description: 'Java-based Telegram bot integrated with the CoinGecko API to retrieve real-time Bitcoin prices, with a RESTful backend for managing price alerts.',
    features: ['Live Bitcoin price retrieval using CoinGecko API', 'Telegram command interface for price and alert management', 'RESTful backend for managing Bitcoin price alerts', 'Java 21 and Maven-based project structure'],
    github: 'https://github.com/AtharvaKedar123/Java_Programming_Projects_OOP_Edition/tree/master/Bitcoin%20Project',
    bar: [88, 84, 91, 79], pie: [50, 30, 20], labels: ['Java', 'REST API', 'Telegram', 'CoinGecko']
  }
};

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id && projects[id]) {
  const project = projects[id];
  const setText = (selector, text) => { const el = document.getElementById(selector); if (el) el.textContent = text; };
  setText('project-title', project.title);
  setText('project-category', project.category);
  setText('project-description', project.description);
  setText('metric-one', `${project.bar[0]}%`);
  setText('metric-two', `${project.bar[1]}%`);
  setText('metric-three', `${project.bar[2]}%`);

  const github = document.getElementById('github-link');
  if (github) github.href = project.github;

  const tech = document.getElementById('tech-stack');
  if (tech) {
    tech.innerHTML = '';
    project.tech.forEach((item) => {
      const span = document.createElement('span');
      span.textContent = item;
      tech.appendChild(span);
    });
  }

  const features = document.getElementById('features');
  if (features) {
    features.innerHTML = '';
    project.features.forEach((item) => {
      const div = document.createElement('div');
      div.textContent = item;
      features.appendChild(div);
    });
  }

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    plugins: {
      legend: { labels: { color: '#41514b', font: { family: 'DM Sans', weight: '600' } } },
      tooltip: {
        backgroundColor: '#1d2a26', titleColor: '#ffffff', bodyColor: '#f6f0e7',
        borderColor: 'rgba(255,255,255,.08)', borderWidth: 1, padding: 12, cornerRadius: 10
      }
    }
  };

  const bar = document.getElementById('barChart');
  if (bar && window.Chart) {
    new Chart(bar, {
      type: 'bar',
      data: { labels: project.labels, datasets: [{ label: 'Performance Score', data: project.bar, backgroundColor: ['#1f5b4d','#2e7463','#91aa9c','#c5a15a'], borderRadius: 10 }] },
      options: {
        ...commonOptions,
        scales: {
          x: { ticks: { color: '#41514b', font: { weight: '600' } }, grid: { display: false } },
          y: { ticks: { color: '#718078' }, grid: { color: 'rgba(29,42,38,.08)' }, beginAtZero: true, suggestedMax: 100 }
        }
      }
    });
  }

  const pie = document.getElementById('pieChart');
  if (pie && window.Chart) {
    new Chart(pie, {
      type: 'doughnut',
      data: { labels: ['Core Logic','Insights/UI','Optimization'], datasets: [{ data: project.pie, backgroundColor: ['#1f5b4d','#91aa9c','#c5a15a'], borderColor: '#fffdf9', borderWidth: 5, hoverOffset: 8 }] },
      options: { ...commonOptions, cutout: '64%' }
    });
  }
}

// Icons
if (window.lucide) window.lucide.createIcons();
