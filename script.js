// Reveal animation on scroll
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 90) {
      el.classList.add("active");
    }
  });
}

revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

// Cursor glow animation
const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }
});

// Typing animation
const typedRole = document.getElementById("typed-role");

const roles = [
  "Backend Developer",
  "Python & Data Systems Engineer",
  "Java Core Developer",
  "SQL & Power BI Analyst",
  "Data Engineering Learner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typedRole) return;

  const current = roles[roleIndex];

  if (!deleting) {
    typedRole.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length + 8) deleting = true;
  } else {
    typedRole.textContent = current.substring(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 80);
}

typeEffect();

// Project data
const projects = {
  fraud: {
    title: "Fraud Detection & Risk Monitoring System",
    category: "Power BI Dashboard",
    tech: ["Power BI", "Analytics", "Dashboard", "Risk Monitoring"],
    description:
      "Interactive Power BI dashboard designed to monitor suspicious activity, risk patterns, KPI changes, alerts, and business-level fraud insights through clean visual analytics.",
    features: [
      "KPI tracking and fraud risk monitoring",
      "Interactive filters and slicers",
      "Conditional formatting for alert zones",
      "Clean business-ready dashboard layout"
    ],
    github:
      "https://github.com/AtharvaKedar123/PowerBi_Dashboards/tree/main/Inventory%20Optimization%20%26%20Demand%20Forecast%20Dashboard",
    bar: [88, 84, 92, 80],
    pie: [55, 30, 15],
    labels: ["KPIs", "Insights", "Visuals", "Filters"]
  },

  stock: {
    title: "Real-Time Stock Trading Simulator",
    category: "Java OOP Project",
    tech: ["Java", "OOP", "Simulation", "Trading"],
    description:
      "Java-based stock trading simulator that allows users to buy and sell stocks, track portfolio value, calculate profit/loss, and simulate real-world market movement using clean OOP design.",
    features: [
      "Buy and sell order execution",
      "Portfolio value tracking",
      "Profit and loss calculation",
      "Clean object-oriented architecture"
    ],
    github:
      "https://github.com/AtharvaKedar123/Java_Programming_Projects_OOP_Edition/tree/master/Real_Time_Stock_Trading_Simulator_OOP",
    bar: [90, 86, 88, 82],
    pie: [50, 35, 15],
    labels: ["OOP", "Trading", "Analytics", "Simulation"]
  },

  lru: {
    title: "LRU Cache Implementation (O(1))",
    category: "Java DSA Project",
    tech: ["Java", "DSA", "HashMap", "Doubly Linked List"],
    description:
      "High-performance Least Recently Used cache built using HashMap and Doubly Linked List to achieve O(1) time complexity for get and put operations.",
    features: [
      "O(1) get and put operations",
      "Efficient least-recently-used eviction policy",
      "HashMap and Doubly Linked List design",
      "Real-world caching system logic"
    ],
    github:
      "https://github.com/AtharvaKedar123/Data_structure_And_Algorithms_With_JAVA/tree/main/LRU%20Cache%20Implementation",
    bar: [98, 95, 90, 86],
    pie: [50, 35, 15],
    labels: ["Performance", "DSA", "Memory", "Design"]
  },

  traffic: {
    title: "Smart Traffic Control System",
    category: "Python OOP Project",
    tech: ["Python", "OOP", "Simulation", "Automation"],
    description:
      "Python OOP-based traffic control simulation that adjusts signal timings based on vehicle density and supports emergency vehicle priority.",
    features: [
      "Dynamic signal timing",
      "Emergency vehicle priority",
      "Sensor-based traffic monitoring",
      "Scalable OOP structure"
    ],
    github:
      "https://github.com/AtharvaKedar123/Python_Programming_Projects_OOP_Edition/tree/master/Smart_Traffic_System_OOP",
    bar: [87, 90, 80, 85],
    pie: [45, 35, 20],
    labels: ["OOP", "Logic", "Simulation", "Scalability"]
  },

  bot: {
    title: "Order Automation Bot",
    category: "Python Automation Project",
    tech: ["Python", "Automation", "Telegram API", "Scheduling"],
    description:
      "Python automation bot built to monitor real-time events, trigger rule-based actions, and send instant Telegram alerts through API integrations.",
    features: [
      "Workflow automation",
      "Telegram/API alert integration",
      "Rule-based event triggers",
      "Scheduled monitoring"
    ],
    github:
      "https://github.com/AtharvaKedar123/Python_Programming_Projects/tree/master/Day%20098%20%E2%80%93%20Order%20Automation%20Bot%20(Bitcoin%20Alert%20Bot%20for%20Telegram)",
    bar: [88, 84, 91, 79],
    pie: [50, 30, 20],
    labels: ["Automation", "API", "Alerts", "Monitoring"]
  }
};

// Load project detail page
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id && projects[id]) {
  const project = projects[id];

  const title = document.getElementById("project-title");
  const category = document.getElementById("project-category");
  const description = document.getElementById("project-description");
  const githubLink = document.getElementById("github-link");
  const techStack = document.getElementById("tech-stack");
  const features = document.getElementById("features");

  if (title) title.textContent = project.title;
  if (category) category.textContent = project.category;
  if (description) description.textContent = project.description;
  if (githubLink) githubLink.href = project.github;

  if (techStack) {
    techStack.innerHTML = "";
    project.tech.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      techStack.appendChild(span);
    });
  }

  if (features) {
    features.innerHTML = "";
    project.features.forEach((feature) => {
      const div = document.createElement("div");
      div.textContent = "⚡ " + feature;
      features.appendChild(div);
    });
  }

  const metricOne = document.getElementById("metric-one");
  const metricTwo = document.getElementById("metric-two");
  const metricThree = document.getElementById("metric-three");

  if (metricOne) metricOne.textContent = project.bar[0] + "%";
  if (metricTwo) metricTwo.textContent = project.bar[1] + "%";
  if (metricThree) metricThree.textContent = project.bar[2] + "%";

  const barCanvas = document.getElementById("barChart");
  const pieCanvas = document.getElementById("pieChart");

  if (barCanvas && window.Chart) {
    new Chart(barCanvas, {
      type: "bar",
      data: {
        labels: project.labels,
        datasets: [
          {
            label: "Performance Score",
            data: project.bar,
            backgroundColor: ["#2563eb", "#9333ea", "#ec4899", "#22c55e"],
            hoverBackgroundColor: ["#3b82f6", "#a855f7", "#f472b6", "#4ade80"],
            borderRadius: 14
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: {
            labels: {
              color: "#334155",
              font: {
                weight: "bold"
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#334155",
              font: {
                weight: "bold"
              }
            },
            grid: {
              color: "rgba(148,163,184,0.18)"
            }
          },
          y: {
            ticks: {
              color: "#334155",
              font: {
                weight: "bold"
              }
            },
            grid: {
              color: "rgba(148,163,184,0.18)"
            }
          }
        }
      }
    });
  }

  if (pieCanvas && window.Chart) {
    new Chart(pieCanvas, {
      type: "doughnut",
      data: {
        labels: ["Core Logic", "Insights/UI", "Optimization"],
        datasets: [
          {
            data: project.pie,
            backgroundColor: ["#2563eb", "#9333ea", "#22c55e"],
            hoverBackgroundColor: ["#3b82f6", "#a855f7", "#4ade80"],
            borderColor: "#ffffff",
            borderWidth: 5
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: {
            labels: {
              color: "#334155",
              font: {
                weight: "bold"
              }
            }
          }
        }
      }
    });
  }
}

// Tilt animation for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / 18) * -1;
    const rotateY = (x - rect.width / 2) / 18;

    card.style.transform =
      `translateY(-14px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Small floating animation on stat cards
document.querySelectorAll(".stats div").forEach((card, index) => {
  card.style.animation = `softFloat 4s ease-in-out ${index * 0.25}s infinite`;
});

// Inject animation keyframes using JS
const style = document.createElement("style");
style.innerHTML = `
@keyframes softFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
`;
document.head.appendChild(style);

// Icons
if (window.lucide) {
  lucide.createIcons();
}