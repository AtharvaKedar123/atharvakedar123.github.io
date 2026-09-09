
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  if (window.lucide) window.lucide.createIcons();

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  setupReveal();
  setupProgressAndNav();
  setupTyping();
  setupMetricCounters();
  setupPageVisibilityPerformance();
  setupPerformanceVisibility();
  setupProjectDetail();
});

function setupReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(el => observer.observe(el));
}

function setupProgressAndNav() {
  const progress = document.querySelector('.scroll-progress span');
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
  const sectionIds = ['about', 'stack', 'experience', 'projects', 'extracurriculars', 'contact'];
  const sections = sectionIds
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((item) => item.el);

  let sectionPositions = [];
  let ticking = false;
  let currentHash = '';

  const measure = () => {
    sectionPositions = sections.map(({ id, el }) => ({
      hash: `#${id}`,
      top: el.offsetTop
    }));
  };

  const render = () => {
    ticking = false;

    const y = window.scrollY;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;

    if (progress) {
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    }

    let nextHash = '';
    for (let i = 0; i < sectionPositions.length; i += 1) {
      if (y >= sectionPositions[i].top - 220) {
        nextHash = sectionPositions[i].hash;
      } else {
        break;
      }
    }

    if (nextHash !== currentHash) {
      currentHash = nextHash;
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active-link',
          link.getAttribute('href') === currentHash
        );
      });
    }
  };

  const requestRender = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
  };

  measure();
  render();

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    requestRender();
  }, { passive: true });
}

function setupTyping() {
  const target = document.getElementById('typed-role');
  if (!target) return;

  const roles = [
    'Java + Spring Boot',
    'REST API Engineering',
    'JDBC + SQL',
    'Backend Architecture',
    'Clean, maintainable systems'
  ];

  let roleIndex = 0;
  target.textContent = roles[roleIndex];

  const swapRole = () => {
    target.classList.add('role-fade');

    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      target.textContent = roles[roleIndex];
      target.classList.remove('role-fade');
    }, 180);
  };

  window.setInterval(swapRole, 2800);
}

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
    scores: [
      ['KPI Design', 88],
      ['Business Insight', 84],
      ['Visual Clarity', 92],
      ['Filtering', 80]
    ]
  },

  stock: {
    title: 'Real-Time Stock Trading Simulator',
    category: 'Java OOP Project',
    tech: ['Java', 'OOP', 'Simulation', 'Trading'],
    description: 'Java-based stock trading simulator that allows users to buy and sell stocks, track portfolio value, calculate profit/loss, and simulate real-world market movement using clean OOP design.',
    features: [
      'Buy and sell order execution',
      'Portfolio value tracking',
      'Profit and loss calculation',
      'Clean object-oriented architecture'
    ],
    github: 'https://github.com/AtharvaKedar123/Java_Programming_Projects_OOP_Edition/tree/master/Real_Time_Stock_Trading_Simulator_OOP',
    scores: [
      ['OOP Design', 90],
      ['Trading Logic', 86],
      ['Analytics', 88],
      ['Simulation', 82]
    ]
  },

  lru: {
    title: 'LRU Cache Implementation (O(1))',
    category: 'Java DSA Project',
    tech: ['Java', 'DSA', 'HashMap', 'Doubly Linked List'],
    description: 'High-performance Least Recently Used cache built using HashMap and Doubly Linked List to achieve O(1) time complexity for get and put operations.',
    features: [
      'O(1) get and put operations',
      'Efficient least-recently-used eviction policy',
      'HashMap and Doubly Linked List design',
      'Real-world caching system logic'
    ],
    github: 'https://github.com/AtharvaKedar123/Data_structure_And_Algorithms_With_JAVA/tree/main/LRU%20Cache%20Implementation',
    scores: [
      ['Performance', 98],
      ['DSA Strength', 95],
      ['Memory Logic', 90],
      ['System Design', 86]
    ]
  },

  traffic: {
    title: 'Smart Traffic Control System',
    category: 'Python OOP Project',
    tech: ['Python', 'OOP', 'Simulation', 'Automation'],
    description: 'Python OOP-based traffic control simulation that adjusts signal timings based on vehicle density and supports emergency vehicle priority.',
    features: [
      'Dynamic signal timing',
      'Emergency vehicle priority',
      'Sensor-based traffic monitoring',
      'Scalable OOP structure'
    ],
    github: 'https://github.com/AtharvaKedar123/Python_Programming_Projects_OOP_Edition/tree/master/Smart_Traffic_System_OOP',
    scores: [
      ['OOP Design', 87],
      ['Decision Logic', 90],
      ['Simulation', 80],
      ['Scalability', 85]
    ]
  },

  bot: {
    title: 'Bitcoin Alert Bot',
    category: 'Java Backend Project',
    tech: ['Java', 'Maven', 'REST API', 'Telegram API', 'CoinGecko API'],
    description: 'Java-based Telegram bot integrated with the CoinGecko API to retrieve real-time Bitcoin prices, with a RESTful backend for managing price alerts.',
    features: [
      'Live Bitcoin price retrieval using CoinGecko API',
      'Telegram command interface for price and alert management',
      'RESTful backend for managing Bitcoin price alerts',
      'Java 21 and Maven-based project structure'
    ],
    github: 'https://github.com/AtharvaKedar123/Java_Programming_Projects_OOP_Edition/tree/master/Bitcoin%20Project',
    scores: [
      ['Java Backend', 88],
      ['API Integration', 91],
      ['Telegram Logic', 84],
      ['Project Structure', 79]
    ]
  }
};

function setupProjectDetail() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id || !projects[id]) return;

  const project = projects[id];

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText('project-title', project.title);
  setText('project-category', project.category);
  setText('project-description', project.description);

  const scoreValues = project.scores.map(item => item[1]);
  setText('metric-one', `${scoreValues[0]}%`);
  setText('metric-two', `${scoreValues[1]}%`);
  setText('metric-three', `${scoreValues[2]}%`);

  const githubLink = document.getElementById('github-link');
  if (githubLink) githubLink.href = project.github;

  const tech = document.getElementById('tech-stack');
  if (tech) {
    tech.innerHTML = '';
    project.tech.forEach((name) => {
      const span = document.createElement('span');
      span.textContent = name;
      tech.appendChild(span);
    });
  }

  const features = document.getElementById('features');
  if (features) {
    features.innerHTML = '';
    project.features.forEach((feature) => {
      const div = document.createElement('div');
      div.textContent = feature;
      features.appendChild(div);
    });
  }

  const bars = document.getElementById('score-bars');
  if (bars) {
    bars.innerHTML = '';

    project.scores.forEach(([label, value], index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'score-item';

      const top = document.createElement('div');
      top.className = 'score-top';

      const name = document.createElement('span');
      name.textContent = label;

      const score = document.createElement('strong');
      score.textContent = `${value}%`;

      top.appendChild(name);
      top.appendChild(score);

      const track = document.createElement('div');
      track.className = 'score-track';

      const fill = document.createElement('span');
      track.appendChild(fill);

      wrapper.appendChild(top);
      wrapper.appendChild(track);
      bars.appendChild(wrapper);

      setTimeout(() => {
        fill.style.width = `${value}%`;
      }, 180 + (index * 120));
    });
  }

  if (window.lucide) window.lucide.createIcons();
}


function setupMetricCounters() {
  const metrics = document.querySelectorAll('.metric-number[data-value]');
  if (!metrics.length) return;

  const animateMetric = (el) => {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = Number(el.dataset.value || 0);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const duration = target >= 50 ? 1400 : 1200;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = target * easeOutCubic(progress);

      if (decimals > 0) {
        el.textContent = `${current.toFixed(decimals)}${suffix}`;
      } else {
        el.textContent = `${Math.round(current)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = decimals > 0
          ? `${target.toFixed(decimals)}${suffix}`
          : `${Math.round(target)}${suffix}`;
      }
    };

    requestAnimationFrame(frame);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateMetric(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .55 });

    metrics.forEach((metric) => observer.observe(metric));
  } else {
    metrics.forEach(animateMetric);
  }
}


function setupPageVisibilityPerformance() {
  const update = () => {
    document.documentElement.classList.toggle('page-paused', document.hidden);
  };

  document.addEventListener('visibilitychange', update, { passive: true });
  update();
}


function setupPerformanceVisibility() {
  const targets = [
    document.getElementById('home'),
    document.getElementById('stack'),
    document.getElementById('extracurriculars')
  ].filter(Boolean);

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('perf-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(
        'perf-visible',
        entry.isIntersecting
      );
    });
  }, {
    rootMargin: '180px 0px 180px 0px',
    threshold: 0
  });

  targets.forEach((el) => observer.observe(el));
}
