const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

// Cursor glow
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
  "Python Automation Builder",
  "Java OOP Project Developer",
  "SQL & Power BI Analyst"
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
      "Interactive Power BI dashboard designed to monitor risk patterns, suspicious activities, KPI changes, and business insights through clean visual analytics.",
    features: [
      "KPI tracking and risk monitoring",
      "Interactive filters and slicers",
      "Conditional formatting for alerts",
      "Business-ready dashboard layout"
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
      "Java-based real-time trading simulator that allows users to buy and sell stocks, track portfolio value, calculate profit/loss, and simulate market movement.",
    features: [
      "Buy and sell order execution",
      "Portfolio tracking",
      "Profit/loss calculation",
      "Clean OOP architecture"
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
      "Efficient eviction policy",
      "HashMap + Doubly Linked List design",
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
      "Python automation bot built to monitor events, trigger rule-based actions, and send real-time alerts through API integrations like Telegram.",
    features: [
      "Workflow automation",
      "Telegram/API alerts",
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

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-category").textContent = project.category;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("github-link").href = project.github;

  const techStack = document.getElementById("tech-stack");
  project.tech.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    techStack.appendChild(span);
  });

  const features = document.getElementById("features");
  project.features.forEach((feature) => {
    const div = document.createElement("div");
    div.textContent = "⚡ " + feature;
    features.appendChild(div);
  });

  document.getElementById("metric-one").textContent = project.bar[0] + "%";
  document.getElementById("metric-two").textContent = project.bar[1] + "%";
  document.getElementById("metric-three").textContent = project.bar[2] + "%";

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: project.labels,
      datasets: [
        {
          label: "Performance Score",
          data: project.bar,
          backgroundColor: ["#38bdf8", "#6366f1", "#8b5cf6", "#22c55e"],
          hoverBackgroundColor: ["#7dd3fc", "#818cf8", "#c4b5fd", "#86efac"],
          borderRadius: 12
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1400,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#cbd5e1"
          },
          grid: {
            color: "rgba(148,163,184,0.12)"
          }
        },
        y: {
          ticks: {
            color: "#cbd5e1"
          },
          grid: {
            color: "rgba(148,163,184,0.12)"
          }
        }
      }
    }
  });

  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["Core Logic", "Insights/UI", "Optimization"],
      datasets: [
        {
          data: project.pie,
          backgroundColor: ["#38bdf8", "#8b5cf6", "#22c55e"],
          hoverBackgroundColor: ["#7dd3fc", "#c4b5fd", "#86efac"],
          borderColor: "#020617",
          borderWidth: 4
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1400,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0"
          }
        }
      }
    }
  });
}

// Tilt project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / 20) * -1;
    const rotateY = (x - rect.width / 2) / 20;

    card.style.transform =
      `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Icons
if (window.lucide) {
  lucide.createIcons();
}