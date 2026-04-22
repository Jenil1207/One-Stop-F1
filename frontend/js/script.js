function goHome() { window.location.href = "index.html"; }
function goToAllTeams() { window.location.href = "teams.html"; }
function goToTeam(key) { window.location.href = `team.html?team=${key}`; }
function goToAllDrivers() { window.location.href = "drivers.html"; }
function goToDriver(idx) { window.location.href = `driver.html?id=${idx}`; }

function scrollToSchedule() {
  const el = document.getElementById("scheduleSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.location.href = "schedule.html";
}
function scrollToNews() {
  const el = document.getElementById("newsSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.location.href = "news.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (matchMedia('(pointer:fine)').matches) {
    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const render = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    const checkInteractables = () => {
      const interactables = document.querySelectorAll("a, button, li, .team-card, .driver-card, .race-card, .logo, .full-race-card, .full-news-card, .team-page-card, select, input, textarea");
      interactables.forEach(el => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = "true";
          el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
          el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
        }
      });
    };

    checkInteractables();
    setTimeout(checkInteractables, 500);
    setTimeout(checkInteractables, 1000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".has-mega");
  const megaWrapper = document.getElementById("megaWrapper");
  if (!btn || !megaWrapper) return;

  let timer;
  const open = () => { clearTimeout(timer); megaWrapper.classList.add("active"); };
  const close = () => { megaWrapper.classList.remove("active"); };

  btn.addEventListener("mouseenter", open);
  btn.addEventListener("mouseleave", () => { timer = setTimeout(() => { if (!megaWrapper.matches(":hover")) close(); }, 250); });
  megaWrapper.addEventListener("mouseenter", () => clearTimeout(timer));
  megaWrapper.addEventListener("mouseleave", () => { timer = setTimeout(close, 250); });
  document.addEventListener("click", (e) => { if (!megaWrapper.contains(e.target) && !btn.contains(e.target)) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
});

document.addEventListener("DOMContentLoaded", () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.08 });
  document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
});

function scrollCarousel(dir) {
  const c = document.getElementById("driversCarousel");
  if (c) c.scrollBy({ left: dir * 270, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const bar = document.createElement("div");
  bar.className = "mcqueen-scrollbar";
  bar.innerHTML = `
    <div class="mcqueen-track"></div>
    <div class="mcqueen-car" id="mcqueenCar">🏎️</div>
  `;
  document.body.appendChild(bar);

  const car = document.getElementById("mcqueenCar");

  function updateCar() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const trackH = window.innerHeight - 20;
    const topPx = Math.round(progress * trackH);
    car.style.top = topPx + "px";
  }

  window.addEventListener("scroll", updateCar, { passive: true });
  updateCar();
});

function renderMegaMenu() {
  const grid = document.getElementById("megaTeamsGrid");
  if (!grid || typeof teamsData === "undefined") return;
  grid.innerHTML = Object.keys(teamsData).map(key => {
    const t = teamsData[key];
    return `
      <div class="team-card" onclick="goToTeam('${key}')">
        <h4>${t.name}</h4>
        <img class="team-logo" src="${t.logo}" alt="${t.name}">
        <img class="team-car"  src="${t.car}"  alt="${t.name} car">
      </div>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderMegaMenu);

function renderDriversCarousel() {
  const c = document.getElementById("driversCarousel");
  if (!c || typeof driversData === "undefined") return;
  c.innerHTML = driversData.map((driver, idx) => {
    const key = Object.keys(teamsData).find(k => teamsData[k].logo === driver.teamLogo);
    const color = key ? teamsData[key].color : "#444";
    return `
      <div class="driver-card" style="--team-color:${color}" onclick="goToDriver(${idx})">
        <div class="driver-highlight"></div>
        <div class="driver-number">${driver.number}</div>
        <div class="driver-badges">
          <img class="team-logo-badge" src="${driver.teamLogo}" alt="logo">
          <img class="flag-badge"      src="${driver.flag}"     alt="flag">
        </div>
        <img class="driver-image" src="${driver.image}" alt="${driver.name}" loading="lazy">
        <div class="driver-info">
          <div class="driver-name">${driver.name}</div>
          <div class="driver-team"><span class="driver-team-dot"></span>${driver.team}</div>
        </div>
      </div>`;
  }).join("");
}

function renderSchedule() {
  const c = document.getElementById("scheduleScroll");
  if (!c || typeof scheduleData === "undefined") return;

  const today = new Date("2025-03-15");
  let nextIdx = scheduleData.findIndex(r => r.status === "next");
  if (nextIdx < 0) nextIdx = scheduleData.findIndex(r => r.status === "upcoming");

  c.innerHTML = scheduleData.map((race, i) => {
    const isNext = i === nextIdx;
    return `
      <div class="race-card${isNext ? " next-race" : ""}" onclick="window.location.href='schedule.html'">
        <div class="race-card-top">
          <span class="round">${race.round}</span>
          <span class="race-flag">${race.flag}</span>
        </div>
        <div class="race-card-body">
          ${isNext ? '<span class="next-badge">Next Race</span>' : ""}
          <div class="race-name">${race.name}</div>
          <div class="race-circuit">${race.circuit}</div>
          <div class="race-date">${race.date}</div>
        </div>
      </div>`;
  }).join("");

  if (nextIdx > 0) {
    setTimeout(() => {
      const cards = c.querySelectorAll(".race-card");
      if (cards[nextIdx]) c.scrollLeft = cards[nextIdx].offsetLeft - c.offsetLeft - 60;
    }, 200);
  }
}

function renderFullSchedule() {
  const grid = document.getElementById("fullScheduleGrid");
  if (!grid || typeof scheduleData === "undefined") return;
  grid.innerHTML = scheduleData.map(race => `
    <div class="full-race-card status-${race.status}">
      <div class="frc-sidebar"></div>
      <div class="frc-body">
        <div class="frc-flag">${race.flag}</div>
        <div class="frc-info">
          <div class="frc-round">${race.round}</div>
          ${race.status === "next" ? '<div class="frc-next-badge">Next Race</div>' : ""}
          <div class="frc-name">${race.name}</div>
          <div class="frc-circuit">${race.circuit}</div>
          <div class="frc-meta">
            <span class="frc-date">${race.date}</span>
            <span class="frc-detail">${race.laps} laps · ${race.distance}</span>
            ${race.winner ? `<span class="frc-winner">🏆 ${race.winner}</span>` : ""}
            <button class="btn-primary" onclick="event.stopPropagation(); downloadICS('${race.name}', '${race.date}', '${race.circuit}')" style="padding:6px 10px; font-size:9px; margin-left:10px;">📅 SAVE TO CALENDAR</button>
          </div>
        </div>
      </div>
    </div>`).join("");
}

function downloadICS(eventName, dateStr, circuitName) {
  const calContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//F1 2025 Hub//EN",
    "BEGIN:VEVENT",
    "DTSTART;VALUE=DATE:20250301",
    "DTEND;VALUE=DATE:20250303",
    `SUMMARY:F1 ${eventName}`,
    `DESCRIPTION:Formula 1 2025 Season - ${eventName}`,
    `LOCATION:${circuitName}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([calContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${eventName.replace(/\s+/g, '_')}_2025.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function renderNews() {
  const grid = document.getElementById("newsGrid");
  if (!grid || typeof newsData === "undefined") return;
  const items = newsData.slice(0, 3);
  grid.innerHTML = items.map((a, i) => `
    <div class="news-card${i === 0 ? " featured" : ""}" onclick="window.location.href='news-article.html?id=${i}'" style="cursor:pointer;">
      <div class="news-card-img-placeholder" style="background-image:url('${a.image}'); background-size:contain; background-repeat:no-repeat; background-position:center; font-size:0; background-color:#111;">
        <img src="${a.image}" alt="${a.title}" style="width:100%;height:100%;object-fit:contain;border-radius:inherit;background:#111;" onerror="this.parentElement.innerHTML='${a.emoji}'; this.parentElement.style.fontSize='48px'; this.parentElement.style.backgroundImage='none';">
      </div>
      <div class="news-card-body">
        <span class="news-tag">${a.tag}</span>
        <h3>${a.title}</h3>
        <p class="news-meta">${a.meta}</p>
      </div>
    </div>`).join("");
}

function renderFullNews() {
  const grid = document.getElementById("fullNewsGrid");
  if (!grid || typeof newsData === "undefined") return;
  grid.innerHTML = newsData.map((a, i) => {
    const featured = i === 0;
    return `
      <div class="full-news-card${featured ? " featured-card" : ""}" onclick="window.location.href='news-article.html?id=${i}'" style="cursor:pointer;">
        <div class="fnc-img" style="overflow:hidden; background:#111;">
          <img src="${a.image}" alt="${a.title}" style="width:100%;height:100%;object-fit:contain;background:#111;" onerror="this.parentElement.innerHTML='<span style=\'font-size:48px\'>${a.emoji}</span>'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center';">
        </div>
        <div class="fnc-body">
          <span class="fnc-tag">${a.tag}</span>
          <h3 class="fnc-title">${a.title}</h3>
          <p class="fnc-body-text">${a.body}</p>
          <p class="fnc-meta">${a.meta}</p>
        </div>
      </div>`;
  }).join("");
}

function renderArticle() {
  const container = document.getElementById("articleContent");
  if (!container || typeof newsData === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const idStr = params.get('id');
  if (!idStr || isNaN(idStr) || !newsData[idStr]) {
    container.innerHTML = "<h1 style='text-align:center; padding: 100px 0;'>Article Not Found</h1>";
    return;
  }

  const a = newsData[idStr];
  const teamRandom = ['Mercedes', 'Ferrari', 'Red Bull Racing', 'McLaren'][Math.floor(Math.random() * 4)];

  container.innerHTML = `
    <div class="article-hero">
      <div class="article-hero-img">
        <img src="${a.image}" alt="${a.title}" onerror="this.parentElement.innerHTML='<div style=\'font-size:80px; text-align:center; padding:60px\'>${a.emoji}</div>';">
      </div>
      <div class="article-hero-overlay">
        <div class="article-tag">${a.tag}</div>
        <h1 class="article-title">${a.title}</h1>
        <p class="article-meta">${a.meta}</p>
      </div>
    </div>
    <div class="article-body">
      <p class="lead">${a.body}</p>
      <p>As the Formula 1 2025 season continues to unfold, every race weekend proves extremely crucial for the World Championship narrative. The paddock is abuzz with the recent technological and aerodynamic adjustments enacted by the FIA. The shifting dynamics present a tantalizing puzzle for structural engineers down the grid, especially at ${teamRandom}.</p>
      <div class="article-pullquote">"The 2025 regulations redefine the boundary between driver instinct and engineering brilliance. Missing the setup window by a millimeter costs you tenths on track."</div>
      <p>Looking ahead into the mid-season development war, strategic tire preservation and adept deployment of the 50/50 electrical combustion split will be key to out-maneuvering rivals. We will continue to monitor the evolving tech upgrades week over week.</p>
      <div class="article-back"><button class="btn-secondary" onclick="history.back()">← Back to News</button></div>
    </div>
  `;
}

function renderTeamsPage() {
  const c = document.getElementById("teamsContainer");
  if (!c || typeof teamsData === "undefined") return;
  c.innerHTML = Object.keys(teamsData).map(key => {
    const t = teamsData[key];
    return `
      <div class="team-page-card" onclick="goToTeam('${key}')">
        <div class="team-page-card-top" style="background:${t.color}"></div>
        <div class="team-page-card-body">
          <div class="team-page-card-header">
            <h2>${t.name}</h2>
            <img class="team-logo-page" src="${t.logo}" alt="${t.name}">
          </div>
          <img class="team-car-page" src="${t.car}" alt="${t.name} car">
          <p>${t.description}</p>
          <div class="team-page-card-meta">
            <span>Principal: ${t.principal}</span>
            <span class="drivers-pill">${t.drivers.join(" · ")}</span>
          </div>
        </div>
      </div>`;
  }).join("");
}

function loadTeamPage() {
  if (typeof teamsData === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const teamKey = params.get("team");

  if (!teamKey || !teamsData[teamKey]) {
    document.body.innerHTML = `<div style="padding:120px 60px;text-align:center"><h1>Team not found</h1><br><a href="teams.html" style="color:#E10600">← Back to Teams</a></div>`;
    return;
  }

  const team = teamsData[teamKey];
  document.title = `${team.name} – Formula 1 2025`;

  const heroBg = document.getElementById("teamHeroBg");
  if (heroBg) {
    heroBg.style.background = `linear-gradient(135deg, ${team.color}33 0%, ${team.color}55 50%, transparent 100%), #06060a`;
  }

  const heroContent = document.getElementById("teamHeroContent");
  if (heroContent) {
    heroContent.innerHTML = `
      <div class="team-hero-text">
        <h1>${team.name}</h1>
        <p class="team-base">📍 ${team.base}</p>
      </div>
      <img class="team-hero-logo-big" src="${team.logo}" alt="${team.name} logo">
    `;
  }

  const info = document.getElementById("teamInfo");
  if (info) {
    info.innerHTML = `
      <h2>Team Information</h2>
      <div class="info-row"><span class="info-label">Team Principal</span><span class="info-value">${team.principal}</span></div>
      <div class="info-row"><span class="info-label">Power Unit</span><span class="info-value">${team.powerUnit}</span></div>
      <div class="info-row"><span class="info-label">Base</span><span class="info-value">${team.base}</span></div>
      <div class="info-row"><span class="info-label">World Championships</span><span class="info-value" style="color:${team.color}">${team.championships}</span></div>
      <div class="info-row"><span class="info-label">First Entry</span><span class="info-value">${team.firstEntry}</span></div>
      <div class="info-row"><span class="info-label">Drivers 2025</span><span class="info-value">${team.drivers.join(", ")}</span></div>
      <p style="margin-top:20px;color:#aaa;font-size:13px;line-height:1.8">${team.description}</p>
    `;
  }

  const team3d = document.getElementById("team3dSection");
  if (team3d) {
    team3d.innerHTML = `
      <div class="tech-specs-container">
        <div class="tech-specs-text">
          <h2 style="margin-bottom: 24px;">2025 <b>Technical Specs</b></h2>
          <ul class="tech-specs-list">
            <li><strong>Chassis:</strong> Carbon-fibre composite honeycomb</li>
            <li><strong>Power Unit:</strong> ${team.powerUnit} 1.6L V6 Turbo Hybrid (50/50 Split)</li>
            <li><strong>Transmission:</strong> 8-speed semi-automatic seamless shift</li>
            <li><strong>Weight:</strong> 768 kg (excluding fuel)</li>
            <li><strong>Aerodynamics:</strong> Active aero, dual-mode DRS</li>
            <li><strong>Tyres:</strong> Pirelli P Zero 18-inch</li>
          </ul>
        </div>
        <div class="car-showcase" style="--team-glow: ${team.color}55">
          <div class="car-glow"></div>
          <img class="car-showcase-img"
               src="${team.carLarge || team.car}"
               alt="${team.name} 2025 car"
               loading="lazy"
               onerror="this.src='${team.car}'">
        </div>
      </div>
    `;
  }

  const driversGrid = document.getElementById("teamDriversGrid");
  if (driversGrid && typeof driversData !== "undefined") {
    const teamDrivers = driversData.filter(d => d.team === team.name);
    driversGrid.innerHTML = teamDrivers.map(driver => {
      const realIdx = driversData.indexOf(driver);
      return `
      <div class="driver-card" onclick="goToDriver(${realIdx})" style="--team-color:${team.color}; max-width:300px; cursor:pointer;">
        <div class="driver-highlight"></div>
        <div class="driver-number">${driver.number}</div>
        <div class="driver-badges">
          <img class="team-logo-badge" src="${driver.teamLogo}" alt="logo">
          <img class="flag-badge"      src="${driver.flag}"     alt="flag">
        </div>
        <img class="driver-image" src="${driver.image}" alt="${driver.name}" loading="lazy">
        <div class="driver-info">
          <div class="driver-name">${driver.name}</div>
          <div class="driver-team"><span class="driver-team-dot"></span>No. ${driver.number}</div>
        </div>
      </div>`;
    }).join("");
  }
}

function renderHomeStandings() {
  const dCard = document.getElementById("homeTopDrivers");
  const tCard = document.getElementById("homeTopTeams");
  if (!dCard || !tCard || typeof driversData === "undefined") return;

  const sortedDrivers = [...driversData].sort((a, b) => b.points - a.points).slice(0, 3);
  dCard.innerHTML = sortedDrivers.map((d, i) => {
    const idx = driversData.indexOf(d);
    return `
      <div class="standing-card" onclick="goToDriver(${idx})" style="cursor:pointer;">
        <div class="standing-rank">0${i + 1}</div>
        <img src="${d.flag}" alt="${d.country}">
        <div class="standing-details">
          <strong>${d.name}</strong>
          <span>${d.team}</span>
        </div>
        <div class="standing-points">${d.points} PTS</div>
      </div>
    `;
  }).join("");

  const teamsArr = Object.values(teamsData).sort((a, b) => b.points - a.points).slice(0, 3);
  tCard.innerHTML = teamsArr.map((t, i) => `
    <div class="standing-card" onclick="goToTeam('${Object.keys(teamsData).find(k => teamsData[k] === t)}')">
      <div class="standing-rank">0${i + 1}</div>
      <img src="${t.logo}" alt="${t.name}">
      <div class="standing-details">
        <strong>${t.name}</strong>
      </div>
      <div class="standing-points">${t.points} PTS</div>
    </div>
  `).join("");
}

function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-up, .fade-in').forEach(el => observer.observe(el));
}

function renderTeamsPageStandings() {
  const container = document.getElementById("teamsStandingsTable");
  if (!container || typeof teamsData === "undefined") return;

  const sortedTeams = Object.values(teamsData).sort((a, b) => b.points - a.points);
  const maxPoints = sortedTeams[0].points || 1;

  container.innerHTML = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>POS</th>
          <th>TEAM</th>
          <th style="width: 100%;">POINTS BAR</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        ${sortedTeams.map((t, i) => `
          <tr onclick="goToTeam('${Object.keys(teamsData).find(k => teamsData[k] === t)}')">
            <td class="st-rank">0${i + 1}</td>
            <td class="st-team">
              <img src="${t.logo}" alt="${t.name}">
              <span>${t.name}</span>
            </td>
            <td class="st-bar-cell">
              <div class="st-bar-track">
                <div class="st-bar-fill" style="width: ${(t.points / maxPoints) * 100}%; background: ${t.color}"></div>
              </div>
            </td>
            <td class="st-pts">${t.points}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderPointsChart() {
  const ctx = document.getElementById('pointsChart');
  if (!ctx || typeof teamsData === "undefined" || typeof Chart === "undefined") return;

  const labels = ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'];
  const datasets = Object.values(teamsData).map(t => {
    const p1 = Math.round(t.points * 0.15);
    const p2 = Math.round(t.points * 0.35);
    const p3 = Math.round(t.points * 0.60);
    const p4 = Math.round(t.points * 0.85);
    const p5 = t.points;
    return {
      label: t.name,
      data: [p1, p2, p3, p4, p5],
      borderColor: t.color,
      backgroundColor: t.color + '33',
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 0,
      pointHoverRadius: 6
    };
  });

  datasets.sort((a, b) => a.data[4] - b.data[4]);

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      color: '#ffffff',
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#111', titleColor: '#fff', bodyColor: '#ccc', borderColor: '#333', borderWidth: 1 }
      },
      scales: {
        x: { grid: { color: '#222' }, ticks: { color: '#888', font: { family: 'Orbitron' } } },
        y: {
          grid: { color: '#222' },
          ticks: { color: '#aaa', font: { family: 'monospace', size: 14 } },
          title: { display: true, text: 'Points', color: '#666', font: { family: 'Orbitron' } }
        }
      }
    }
  });
}

function initCompare() {
  const selA = document.getElementById("compareDriverA");
  const selB = document.getElementById("compareDriverB");
  if (!selA || !selB || typeof driversData === "undefined") return;

  let opts = '<option value="">-- Select Driver --</option>';
  driversData.forEach((d, i) => {
    opts += `<option value="${i}">${d.name} (${d.team})</option>`;
  });

  selA.innerHTML = opts;
  selB.innerHTML = opts;
}

function renderComparison() {
  const selA = document.getElementById("compareDriverA").value;
  const selB = document.getElementById("compareDriverB").value;
  const res = document.getElementById("compareResults");

  if (!selA || !selB || selA === selB) {
    res.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--muted); font-family: 'Orbitron', sans-serif;">Select two distinct drivers to compare.</div>`;
    return;
  }

  const dA = driversData[selA];
  const dB = driversData[selB];
  const tA = Object.values(teamsData).find(t => t.name === dA.team) || { color: "#e10600" };
  const tB = Object.values(teamsData).find(t => t.name === dB.team) || { color: "#444" };

  function getAttr(pts, bias) {
    const base = Math.min(99, Math.max(65, (pts / 400) * 100));
    return Math.min(99, Math.max(50, Math.round(base + bias)));
  }

  const dA_Speed = getAttr(dA.points, (dA.name.length % 5));
  const dA_Craft = getAttr(dA.points, (dA.team.length % 4));
  const dA_Cons = getAttr(dA.points, 2);
  const dA_Wet = getAttr(dA.points, -3 + (dA.name.length % 6));
  const dA_Pace = getAttr(dA.points, 4);

  const dB_Speed = getAttr(dB.points, (dB.name.length % 5));
  const dB_Craft = getAttr(dB.points, (dB.team.length % 4));
  const dB_Cons = getAttr(dB.points, 2);
  const dB_Wet = getAttr(dB.points, -3 + (dB.name.length % 6));
  const dB_Pace = getAttr(dB.points, 4);

  let html = `
    <div class="compare-portraits reveal-up visible" style="margin-bottom: 30px;">
      <div class="cp-card" style="border: 2px solid ${tA.color}">
        <img src="${dA.image}" alt="${dA.name}">
        <h2>${dA.name}</h2>
        <p style="color: ${tA.color}">${dA.team}</p>
      </div>
      <div class="cp-card" style="border: 2px solid ${tB.color}">
        <img src="${dB.image}" alt="${dB.name}">
        <h2>${dB.name}</h2>
        <p style="color: ${tB.color}">${dB.team}</p>
      </div>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:30px;">
      <div class="reveal-up visible" style="width:100%; max-width:600px; margin:0 auto; background:var(--bg2); padding:30px; border-radius:12px; border:1px solid var(--border);">
         <h3 style="font-family:'Orbitron'; font-size:16px; color:var(--muted); text-align:center; margin-bottom:15px; letter-spacing:1px; text-transform:uppercase;">Driver Attributes</h3>
         <canvas id="compareRadarChart"></canvas>
      </div>

      <div class="reveal-up visible" style="width:100%; max-width:600px; margin:0 auto; background:var(--bg2); padding:30px; border-radius:12px; border:1px solid var(--border);">
         <h3 style="font-family:'Orbitron'; font-size:16px; color:var(--muted); text-align:center; margin-bottom:15px; letter-spacing:1px; text-transform:uppercase;">Career Stats</h3>
         <canvas id="compareBarChart"></canvas>
      </div>
    </div>
  `;

  res.innerHTML = html;

  setTimeout(() => {
    const ctx = document.getElementById('compareRadarChart').getContext('2d');
    if (window.compareChartInstance) { window.compareChartInstance.destroy(); }

    window.compareChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Race Craft', 'Consistency', 'Wet Weather', 'Qualifying Pace'],
        datasets: [{
          label: dA.name,
          data: [dA_Speed, dA_Craft, dA_Cons, dA_Wet, dA_Pace],
          backgroundColor: tA.color + '40',
          borderColor: tA.color,
          pointBackgroundColor: tA.color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: tA.color
        }, {
          label: dB.name,
          data: [dB_Speed, dB_Craft, dB_Cons, dB_Wet, dB_Pace],
          backgroundColor: tB.color + '40',
          borderColor: tB.color,
          pointBackgroundColor: tB.color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: tB.color
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { color: '#ccc', font: { family: 'Orbitron', size: 14 } } }
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            pointLabels: { color: '#fff', font: { family: 'Inter', size: 13 } },
            ticks: { color: '#888', backdropColor: 'transparent', min: 40, max: 100, stepSize: 20 }
          }
        }
      }
    });

    const ctxBar = document.getElementById('compareBarChart').getContext('2d');
    if (window.compareBarChartInstance) { window.compareBarChartInstance.destroy(); }

    const getStat = (name, pts, max) => Math.min(max, Math.round((pts / 400) * max) + (name.length % 3));
    const statsA = [getStat(dA.name, dA.points, 15), getStat(dA.name, dA.points, 25), dA.points];
    const statsB = [getStat(dB.name, dB.points, 15), getStat(dB.name, dB.points, 25), dB.points];

    window.compareBarChartInstance = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Wins', 'Podiums', 'Total Points'],
        datasets: [
          {
            label: dA.name,
            data: statsA,
            backgroundColor: tA.color,
            borderColor: tA.color,
            borderWidth: 1
          },
          {
            label: dB.name,
            data: statsB,
            backgroundColor: tB.color,
            borderColor: tB.color,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#ccc', font: { family: 'Orbitron' } } } },
        scales: {
          y: { grid: { color: '#222' }, ticks: { color: '#888' } },
          x: { grid: { color: 'transparent' }, ticks: { color: '#aaa', font: { family: 'Orbitron', size: 12 } } }
        }
      }
    });

  }, 100);
}

function initCountdown() {
  const wrapper = document.getElementById('countdownWrapper');
  if (!wrapper || typeof scheduleData === "undefined") return;

  const nextRace = scheduleData.find(r => r.status === 'next') || scheduleData[1];
  const labelSpan = document.getElementById('nextRaceName');
  if (labelSpan) labelSpan.innerText = '- ' + nextRace.name;

  const targetDate = new Date(nextRace.date + ' 15:00:00 UTC').getTime();

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins = document.getElementById('cd-mins');
  const elSecs = document.getElementById('cd-secs');

  if (!elDays || !elHours || !elMins || !elSecs) return;

  function updateRealTime() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff < 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    elDays.innerText = String(d).padStart(2, '0');
    elHours.innerText = String(h).padStart(2, '0');
    elMins.innerText = String(m).padStart(2, '0');
    elSecs.innerText = String(s).padStart(2, '0');
  }

  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff < 0) {
    elDays.innerText = '00'; elHours.innerText = '00'; elMins.innerText = '00'; elSecs.innerText = '00';
    return;
  }

  const finalD = Math.floor(diff / (1000 * 60 * 60 * 24));
  const finalH = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const finalM = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const finalS = Math.floor((diff % (1000 * 60)) / 1000);

  let start = null;
  const duration = 4500;

  function spinStep(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);

    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    elDays.innerText = String(Math.floor(99 - (99 - finalD) * ease)).padStart(2, '0');
    elHours.innerText = String(Math.floor(99 - (99 - finalH) * ease)).padStart(2, '0');
    elMins.innerText = String(Math.floor(99 - (99 - finalM) * ease)).padStart(2, '0');
    elSecs.innerText = String(Math.floor(99 - (99 - finalS) * ease)).padStart(2, '0');

    if (progress < 1) {
      requestAnimationFrame(spinStep);
    } else {
      updateRealTime();
      setInterval(updateRealTime, 1000);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      requestAnimationFrame(spinStep);
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  observer.observe(wrapper);
}

function renderDriversPage() {
  const grid = document.getElementById('driversGrid');
  if (!grid || typeof driversData === 'undefined') return;

  grid.innerHTML = driversData.map((driver, idx) => {
    const key = Object.keys(teamsData).find(k => teamsData[k].logo === driver.teamLogo);
    const color = key ? teamsData[key].color : '#e10600';
    return `
      <div class="driver-page-card reveal-up" onclick="goToDriver(${idx})" style="--team-color:${color}; cursor:pointer;">
        <div class="dpc-top" style="background: linear-gradient(135deg, ${color}22, transparent);">
          <div class="dpc-number" style="color:${color};">${driver.number}</div>
          <img class="dpc-flag" src="${driver.flag}" alt="">
        </div>
        <img class="dpc-portrait" src="${driver.image}" alt="${driver.name}" loading="lazy">
        <div class="dpc-body">
          <img class="dpc-team-logo" src="${driver.teamLogo}" alt="">
          <div class="dpc-name">${driver.name}</div>
          <div class="dpc-team" style="color:${color};">${driver.team}</div>
          <div class="dpc-pts">${driver.points} <span>PTS</span></div>
        </div>
      </div>`;
  }).join('');
}

function loadDriverPage() {
  if (typeof driversData === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const idStr = params.get('id');
  if (idStr === null || isNaN(idStr) || !driversData[idStr]) {
    document.body.innerHTML = `<div style="padding:120px 60px;text-align:center"><h1>Driver not found</h1><br><a href="drivers.html" style="color:#E10600">← Back to Drivers</a></div>`;
    return;
  }

  const driver = driversData[idStr];
  const teamKey = Object.keys(teamsData).find(k => teamsData[k].logo === driver.teamLogo);
  const team = teamKey ? teamsData[teamKey] : { color: '#E10600', name: driver.team, logo: driver.teamLogo };

  document.title = `${driver.name} – Formula 1 2025`;

  const heroBg = document.getElementById('driverHeroBg');
  if (heroBg) heroBg.style.background = `radial-gradient(circle at 60% 50%, ${team.color}40 0%, transparent 65%)`;

  const heroContent = document.getElementById('driverHeroContent');
  if (heroContent) {
    heroContent.innerHTML = `
      <div class="driver-hero-info">
        <img class="driver-hero-logo" src="${team.logo}" alt="${team.name}">
        <div class="driver-hero-number" style="color:${team.color};">${driver.number}</div>
        <div class="driver-hero-name">${driver.name}</div>
        <div class="driver-hero-team">${team.name}</div>
        <img class="driver-hero-flag" src="${driver.flag}" alt="">
      </div>
      <div class="driver-hero-portrait">
        <img src="${driver.image}" alt="${driver.name}">
      </div>`;
  }

  const statsEl = document.getElementById('driverStats');
  if (statsEl) {
    const totalPts = driver.points || 0;
    const wins = Math.floor(totalPts / 25);
    const podiums = Math.floor(totalPts / 12);
    statsEl.innerHTML = `
      <div class="driver-stat-card">
        <div class="ds-value">${driver.number}</div>
        <div class="ds-label">Driver Number</div>
      </div>
      <div class="driver-stat-card">
        <div class="ds-value" style="color:${team.color};">${totalPts}</div>
        <div class="ds-label">2025 Points</div>
      </div>
      <div class="driver-stat-card">
        <div class="ds-value">${wins}</div>
        <div class="ds-label">Wins</div>
      </div>
      <div class="driver-stat-card">
        <div class="ds-value">${podiums}</div>
        <div class="ds-label">Podiums</div>
      </div>`;
  }

  const profileEl = document.getElementById('driverProfile');
  if (profileEl) {
    profileEl.innerHTML = `
      <div class="driver-profile-info">
        <h2>About <span style="color:${team.color};">${driver.name}</span></h2>
        ${driver.bio ? `<p class="driver-bio">${driver.bio}</p>` : ''}
        <div class="driver-profile-table">
          <div class="dpt-row"><span class="dpt-label">Team</span><span class="dpt-val">${team.name}</span></div>
          <div class="dpt-row"><span class="dpt-label">Nationality</span><span class="dpt-val"><img src="${driver.flag}" style="height:18px;vertical-align:middle;border-radius:2px;margin-right:6px;">${driver.nationality || driver.country.toUpperCase()}</span></div>
          ${driver.dob ? `<div class="dpt-row"><span class="dpt-label">Date of Birth</span><span class="dpt-val">${driver.dob}</span></div>` : ''}
          ${driver.hometown ? `<div class="dpt-row"><span class="dpt-label">Hometown</span><span class="dpt-val">${driver.hometown}</span></div>` : ''}
          <div class="dpt-row"><span class="dpt-label">Car Number</span><span class="dpt-val">#${driver.number}</span></div>
          <div class="dpt-row"><span class="dpt-label">2025 Points</span><span class="dpt-val" style="color:${team.color}; font-weight:bold;">${totalPts}</span></div>
        </div>
        <div class="driver-profile-actions">
          <button class="btn-primary" onclick="goToTeam('${teamKey}')">View ${team.name}</button>
          <button class="btn-secondary" onclick="window.location.href='compare.html'">Compare Drivers</button>
          <button class="btn-secondary" onclick="history.back()">← Back</button>
        </div>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const f1UserStr = localStorage.getItem('f1_user');
  if (f1UserStr) {
    try {
      const f1User = JSON.parse(f1UserStr);
      const navLoginBtn = document.getElementById('navLoginBtn');
      if (navLoginBtn) {
        navLoginBtn.innerHTML = f1User.avatar + ' <span style="font-size:8px; opacity:0.6; margin-left:4px;">(OUT)</span>';
        navLoginBtn.style.background = f1User.color || 'var(--surface)';
        navLoginBtn.style.border = '1px solid var(--border)';
        navLoginBtn.title = 'Sign out ' + f1User.name;
        navLoginBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          localStorage.removeItem('f1_user');
          window.location.reload();
        };

        if (f1User.email === 'test@example.com') {
          const navLinks = document.querySelector('.nav-links');
          if (navLinks && !document.getElementById('navAdminBtn')) {
            const adminLi = document.createElement('li');
            adminLi.id = 'navAdminBtn';
            adminLi.textContent = 'Admin Console';
            adminLi.style.cssText = 'background:var(--red);color:#fff;padding:6px 16px;margin-left:14px;font-weight:700;transition:all 0.2s;cursor:pointer; border-radius:4px;';
            adminLi.onclick = () => window.location.href = 'admin.html';
            navLinks.insertBefore(adminLi, navLoginBtn);
          }
        }
      }
    } catch (e) { }
  }
});

function renderPointsChart() {
  const canvas = document.getElementById('pointsChart');
  if (!canvas || typeof teamsData === 'undefined') return;

  const ctx = canvas.getContext('2d');

  const labels = ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'];

  const datasets = Object.values(teamsData).map((team, idx) => {
    const finalPts = team.points || Math.floor(Math.random() * 200 + 20);
    const data = [];
    let current = 0;
    for (let i = 0; i < 5; i++) {
      if (i === 4) { data.push(finalPts); }
      else {
        current += Math.floor(Math.random() * (finalPts / 5) + 2);
        if (current > finalPts) current = finalPts - 5;
        data.push(current);
      }
    }

    return {
      label: team.name,
      data: data,
      borderColor: team.color,
      backgroundColor: team.color,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6
    };
  });

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'right', labels: { color: '#ccc', font: { family: 'Inter', size: 11 } } },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { family: 'Orbitron' }, padding: 12 }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888', font: { family: 'Orbitron' } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888', font: { family: 'Inter' } }, beginAtZero: true }
      }
    }
  });
}

function initLiveStandingsWidget() {
  if (typeof driversData === 'undefined') return;

  const widgetHtml = `
    <div id="liveStandingsWidget" class="live-widget collapsed">
      <div class="live-widget-toggle" onclick="document.getElementById('liveStandingsWidget').classList.toggle('collapsed')">
        <span class="live-dot"></span> TOP 5 LIVE
      </div>
      <div class="live-widget-content">
        <h3 style="font-family:'Orbitron'; font-size:12px; color:var(--muted); margin-bottom:12px; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #333; padding-bottom:8px;">2025 Driver Standings</h3>
        <div class="live-racer-list">
          ${driversData.slice(0, 5).map((d, i) => {
    const team = Object.values(teamsData).find(t => t.name === d.team) || { color: '#E10600' };
    return `
            <div class="live-racer">
              <span class="lr-pos">${i + 1}</span>
              <div class="lr-color" style="background:${team.color}"></div>
              <span class="lr-name">${d.name.split(' ')[1] || d.name}</span>
              <span class="lr-pts">${d.points}</span>
            </div>`;
  }).join('')}
        </div>
        <div style="margin-top:12px; text-align:center;">
           <a href="drivers.html" style="font-size:10px; color:var(--red); text-decoration:none; font-family:'Orbitron';">View Full Grid &rarr;</a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', widgetHtml);
}

document.addEventListener('DOMContentLoaded', initLiveStandingsWidget);

function initGlobalSearch() {
  const searchHtml = `
    <div id="cmdKModal">
      <div id="cmdKContent">
        <input type="text" id="cmdKInput" placeholder="Search drivers, teams, news... (ESC to close)" autocomplete="off">
        <div id="cmdKResults"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', searchHtml);

  const modal = document.getElementById('cmdKModal');
  const input = document.getElementById('cmdKInput');
  const res = document.getElementById('cmdKResults');

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
      if (modal.style.display === 'flex') {
        setTimeout(() => input.focus(), 100);
        input.value = '';
        res.innerHTML = '<div style="padding:10px;color:#888;">Type to start searching...</div>';
      }
    }
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      input.blur();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  input.addEventListener('input', (e) => {
    let q = e.target.value.toLowerCase().trim();
    if (!q) return res.innerHTML = '<div style="padding:10px;color:#888;">Type to start searching...</div>';

    let resultsHTML = '';
    let matchCount = 0;

    if (typeof driversData !== 'undefined') {
      driversData.forEach((d, i) => {
        if (d.name.toLowerCase().includes(q) || d.team.toLowerCase().includes(q)) {
          resultsHTML += `<div class="search-item" onclick="window.location.href='driver.html?id=${i}'">&#127950; Driver: ${d.name} <span style="opacity:0.5;font-size:10px;margin-left:10px;">${d.team}</span></div>`;
          matchCount++;
        }
      });
    }

    if (typeof teamsData !== 'undefined') {
      Object.keys(teamsData).forEach(k => {
        if (teamsData[k].name.toLowerCase().includes(q)) {
          resultsHTML += `<div class="search-item" onclick="window.location.href='team.html?id=${k}'">&#128151; Team: ${teamsData[k].name}</div>`;
          matchCount++;
        }
      });
    }

    if (matchCount === 0) {
      resultsHTML = '<div style="padding:10px;color:#888;">No results found.</div>';
    }

    res.innerHTML = resultsHTML;
  });
}

document.addEventListener('DOMContentLoaded', initGlobalSearch);

document.addEventListener('DOMContentLoaded', () => {
  const loginBtns = document.querySelectorAll('.nav-auth-btn');
  try {
    const user = JSON.parse(localStorage.getItem('f1_user'));
    if (user && user.name) {
      const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      loginBtns.forEach(loginBtn => {
        loginBtn.removeAttribute('onclick');
        loginBtn.innerHTML = `
          <div style="display:flex;align-items:center;gap:14px;">
            <div title="Logged in as: ${user.name}\nEmail: ${user.email}" style="cursor:help; width:30px;height:30px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-family:'Orbitron',sans-serif;${user.color ? 'border:1px solid ' + user.color : ''}; box-shadow:0 0 10px ${user.color ? user.color + '40' : 'transparent'};">
              ${initials}
            </div>
            <button class="logout-btn" title="Sign Out" style="background:rgba(225,6,0,0.1); color:var(--red); border:1px solid var(--red); padding:6px 14px; font-family:'Orbitron',sans-serif; font-size:10px; border-radius:4px; cursor:pointer; font-weight:bold; letter-spacing:1px; transition:all 0.2s;">
              LOGOUT
            </button>
          </div>
        `;
        loginBtn.style.background = 'transparent';
        loginBtn.style.padding = '0';
        loginBtn.style.marginLeft = '16px';

        const logoutBtn = loginBtn.querySelector('.logout-btn');
        logoutBtn.addEventListener('mouseover', () => { logoutBtn.style.background = 'var(--red)'; logoutBtn.style.color = '#fff'; });
        logoutBtn.addEventListener('mouseout', () => { logoutBtn.style.background = 'rgba(225,6,0,0.1)'; logoutBtn.style.color = 'var(--red)'; });

        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          localStorage.removeItem('f1_user');
          window.location.reload();
        });
      });
    }
  } catch (e) { }
});

async function attachJolpicaLayer() {
  try {
    const stands = await getJolpicaDriverStandings();
    const cons = await getJolpicaConstructorStandings();
    const sched = await getJolpicaSchedule();

    const teamMap = {
      "red_bull": "redbull",
      "mercedes": "mercedes",
      "ferrari": "ferrari",
      "mclaren": "mclaren",
      "aston_martin": "astonmartin",
      "alpine": "alpine",
      "williams": "williams",
      "haas": "haas",
      "rb": "racingbulls",
      "sauber": "audi",
      "kick_sauber": "audi"
    };

    if (cons && cons.length > 0) {
      for (const tKey in teamsData) {
        teamsData[tKey].points = 0;
      }
      for (const t of cons) {
        const cId = t.Constructor.constructorId;
        const mapped = teamMap[cId];
        if (mapped && teamsData[mapped]) {
          teamsData[mapped].points = parseInt(t.points, 10);
        }
      }
    }

    if (stands && stands.length > 0) {
      const stMap = {};
      for (const s of stands) {
        stMap[s.Driver.familyName.toLowerCase()] = parseInt(s.points, 10);
      }
      for (const d of driversData) {
        const family = d.name.split(" ").pop().toLowerCase();
        if (stMap[family] !== undefined) {
          d.points = stMap[family];
        } else {
          d.points = 0;
        }
      }
    }

    if (sched && sched.length > 0) {
      let isNextFound = false;
      const now = new Date();
      scheduleData = sched.map((r, i) => {
        let rdateStr = r.date;
        if (r.time) rdateStr += "T" + r.time;
        else rdateStr += "T15:00:00Z";
        let rdate = new Date(rdateStr);
        let status = "completed";
        if (rdate > now) {
          status = isNextFound ? "upcoming" : "next";
          isNextFound = true;
        }
        return {
          round: "Round " + String(i+1).padStart(2, '0'),
          name: r.raceName,
          circuit: r.Circuit.circuitName,
          country: r.Circuit.Location.country,
          flag: r.Circuit.Location.country.substring(0,3).toUpperCase(),
          date: rdate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}),
          laps: 50,
          distance: "300 km",
          status: status,
          winner: null 
        };
      });
    }

    if (typeof renderMegaMenu === 'function' && document.getElementById("megaTeamsGrid")) renderMegaMenu();
    if (typeof renderDriversCarousel === 'function' && document.getElementById("driversCarousel")) renderDriversCarousel();
    if (typeof renderSchedule === 'function' && document.getElementById("scheduleScroll")) renderSchedule();
    if (typeof renderHomeStandings === 'function' && document.getElementById("homeTopDrivers")) renderHomeStandings();
    if (typeof renderTeamsPageStandings === 'function' && document.getElementById("teamsStandingsTable")) renderTeamsPageStandings();
    if (typeof renderTeamsPage === 'function' && document.getElementById("teamsContainer")) renderTeamsPage();
    if (typeof renderPointsChart === 'function' && document.getElementById('pointsChart')) renderPointsChart();
    if (typeof initCompare === 'function' && document.getElementById("compareDriverA")) initCompare();
    if (typeof initCountdown === 'function' && document.getElementById('countdownWrapper')) initCountdown();
    if (typeof renderFullSchedule === 'function' && document.getElementById('fullScheduleGrid')) renderFullSchedule();
  } catch(e) {
    console.error("Jolpica override failed", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
   attachJolpicaLayer();
});
