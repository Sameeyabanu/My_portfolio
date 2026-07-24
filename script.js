const ROLES = ["Software Developer", "Java Developer", "Entry-Level Full Stack Developer"];

const PROJECTS = [
  {
    title: "Exam Duty Portal",
    status: "Completed",
    category: "Web App",
    description: "Full-stack exam duty management portal to streamline duty allocation and tracking, with secure RESTful APIs and a clean, validated UI.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Vue", "Angular"],
    demo: "https://www.shrutha.com",
    code: "https://github.com/Sameeyabanu",
  },
  {
    title: "SkinNova System",
    status: "Completed",
    category: "Web Application",
    description: "Responsive skincare product website with Node.js backend logic and a MySQL database for product data and customer inquiries.",
    stack: ["HTML", "CSS", "JavaScript", "Java", "Database"],
    demo: "https://skinnovaofficalcom.netlify.app",
    code: "https://github.com/Sameeyabanu",
  },
  {
    title: "OralCareX: AI-Enhanced Dental Diagnostics",
    status: "Completed",
    category: "Full Stack Web Application",
    description: "AI-powered diagnostic platform for real-time oral health analysis, with RESTful APIs and a MySQL-backed data layer.",
    stack: ["HTML", "CSS", "JavaScript", "Java", "Database"],
    demo: "https://.oralcare-x-ai-diagonsis.netlify.app",
    code: "https://github.com/Sameeyabanu",
  },
  {
    title: "Food Application",
    status: "Processing",
    category: "Web Application",
    description: "Responsive food ordering web app with JSP-based backend logic and a MySQL Workbench database for product and order data.",
    stack: ["HTML", "CSS", "JavaScript", "JSP", "Eclipse"],
    demo: "https://.knocknockhungrybites.netlify.app",
    code: "https://github.com/Sameeyabanu",
  },
];

const CERTIFICATIONS = [
  {
    name: "AWS Academy Graduate",
    platform: "Amazon Web Services",
    date: "January 2025",
    skills: ["AWS Architecture", "AWS Cloud", "Core Services", "Pricing"],
    url: "https://www.credly.com/badges/6072277b-cd47-4357-901f-3fe408fbd521/public_url",
  },
  {
    name: "IT Database Specialist",
    platform: "Certiport, Pearson VUE",
    date: "August 2024",
    skills: ["Core Database Concepts", "Database Objects", "Administration", "Data Manipulation"],
    url: "https://www.credly.com/users/sameeya-banu",
  },
  {
    name: "Introduction to Data Analytics on Google Cloud",
    platform: "Google Cloud",
    date: "August 2025",
    skills: ["Data Warehousing", "Data Visualization", "SQL", "Big Data"],
    url: "https://www.coursera.org/account/accomplishments/records/ML5CWKUJ6H7N",
  },
  {
    name: "Introduction to Networking and Cloud Computing",
    platform: "Microsoft",
    date: "August 2025",
    skills: ["Virtualization", "Network Infrastructure", "Cybersecurity", "Azure"],
    url: "https://www.coursera.org/account/accomplishments/records/9Q8X8NDBM0QS",
  },
  {
    name: "Python Programming (40 Hours)",
    platform: "Ethnotech Academic Solutions",
    date: "Jul 24 – Jul 28, 2023",
    skills: ["Python Programming", "Programming Fundamentals", "Problem Solving"],
    url: "http://www.verify.ethnotech.in",
  },
];

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const id = el.getAttribute("data-scroll");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("mobileMenu").classList.remove("open");
  });
});

const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  mobileToggle.innerHTML = mobileMenu.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

function typeLoop() {
  const el = document.getElementById("roleText");
  let roleIdx = 0;
  let text = "";
  let deleting = false;

  function tick() {
    const current = ROLES[roleIdx % ROLES.length];
    if (!deleting && text.length < current.length) {
      text = current.slice(0, text.length + 1);
      el.textContent = text;
      setTimeout(tick, 55);
    } else if (!deleting && text.length === current.length) {
      deleting = true;
      setTimeout(tick, 1400);
    } else if (deleting && text.length > 0) {
      text = current.slice(0, text.length - 1);
      el.textContent = text;
      setTimeout(tick, 30);
    } else {
      deleting = false;
      roleIdx += 1;
      setTimeout(tick, 200);
    }
  }
  tick();
}
typeLoop();

function renderProjects(filter) {
  const grid = document.getElementById("projectsGrid");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  grid.innerHTML = list.map((p) => `
    <div class="pf-glass-card pf-project-card pf-reveal pf-visible">
      <div class="pf-project-top">
        <h3>${p.title}</h3>
        <span class="pf-status ${p.status === "Completed" ? "completed" : "processing"}">${p.status}</span>
      </div>
      <p class="pf-desc">${p.description}</p>
      <div class="pf-tag-row" style="margin-bottom:18px">
        ${p.stack.map((t) => `<span class="pf-tag">${t}</span>`).join("")}
      </div>
      <div class="pf-project-links">
        <a href="${p.demo}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live demo</a>
        <a href="${p.code}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Code</a>
      </div>
    </div>
  `).join("");
}

function renderFilters() {
  const row = document.getElementById("filterRow");
  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  row.innerHTML = categories.map((c, i) =>
    `<button class="pf-filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`
  ).join("");
  row.querySelectorAll(".pf-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      row.querySelectorAll(".pf-filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.getAttribute("data-filter"));
    });
  });
}

function renderCertifications() {
  const grid = document.getElementById("certGrid");
  grid.innerHTML = CERTIFICATIONS.map((c, i) => `
    <div class="pf-glass-card pf-cert-card pf-reveal" data-reveal data-delay="${i * 50}">
      <div class="pf-cert-top">
        <div class="pf-cert-icon"><i class="fa-solid fa-award"></i></div>
        <div>
          <h3>${c.name}</h3>
          <p class="pf-cert-meta">${c.platform} &middot; ${c.date}</p>
        </div>
      </div>
      <div class="pf-tag-row">
        ${c.skills.map((s) => `<span class="pf-tag">${s}</span>`).join("")}
      </div>
      <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="pf-cert-link">
        Verify credential <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `).join("");
  observeReveals();
}

renderFilters();
renderProjects("All");
renderCertifications();

function observeReveals() {
  const targets = document.querySelectorAll("[data-reveal]:not(.pf-visible)");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => entry.target.classList.add("pf-visible"), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach((t) => obs.observe(t));
}
observeReveals();

const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const OWNER_EMAIL = "sameeyabanu986@gmail.com";

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("pf-name").value.trim();
  const email = document.getElementById("pf-email").value.trim();
  const message = document.getElementById("pf-message").value.trim();

  const subject = `Portfolio contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const mailtoLink = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  successMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening your email client to send this to Sameeya...';
  successMsg.style.display = "flex";
  setTimeout(() => {
    successMsg.style.display = "none";
    contactForm.reset();
  }, 4500);
});