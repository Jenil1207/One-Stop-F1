function goHome() {
  window.location.href = "index.html";
}

function goToAllTeams() {
  window.location.href = "teams.html";
}

function goToTeam(teamKey) {
  window.location.href = `team.html?team=${teamKey}`;
}

function renderMegaMenu() {
  const megaGrid = document.getElementById("megaTeamsGrid");
  if (!megaGrid || typeof teamsData === "undefined") return;

  megaGrid.innerHTML = "";

  Object.keys(teamsData).forEach(key => {
    const team = teamsData[key];

    megaGrid.innerHTML += `
      <div class="team-card" onclick="goToTeam('${key}')">
        <h4>${team.name}</h4>
        <img class="team-logo" src="${team.logo}" alt="${team.name} logo">
        <img class="team-car" src="${team.car}" alt="${team.name} car">
      </div>
    `;
  });
}

function renderTeamsPage() {
  const container = document.getElementById("teamsContainer");
  if (!container || typeof teamsData === "undefined") return;

  container.innerHTML = "";

  Object.keys(teamsData).forEach(key => {
    const team = teamsData[key];

    container.innerHTML += `
      <div class="team-page-card"
           onclick="goToTeam('${key}')"
           style="border-top: 5px solid ${team.color}">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span>Team Principal: ${team.principal}</span>
      </div>
    `;
  });
}

function loadTeamPage() {

  if (typeof teamsData === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const teamKey = params.get("team");

  if (!teamKey || !teamsData[teamKey]) {
    document.body.innerHTML =
      "<h1 style='padding:50px'>Team not found</h1>";
    return;
  }

  const team = teamsData[teamKey];

  const header = document.getElementById("teamHeader");
  const info = document.getElementById("teamInfo");
  const modelContainer = document.getElementById("modelContainer");

  if (!header || !info || !modelContainer) return;

  header.style.background = team.color;
  header.innerHTML = `<h1>${team.name}</h1>`;

  info.innerHTML = `
    <h2>Team Information</h2>

    <p><strong>Base:</strong> ${team.base}</p>
    <p><strong>Team Principal:</strong> ${team.principal}</p>
    <p><strong>Power Unit:</strong> ${team.powerUnit}</p>
    <p><strong>World Championships:</strong> ${team.championships}</p>
    <p><strong>Drivers:</strong> ${team.drivers.join(", ")}</p>

    <p style="margin-top:20px">${team.description}</p>
  `;

  if (team.model3d && team.model3d !== "") {
    modelContainer.innerHTML = `
        <iframe
            src="${team.model3d}"
            width="100%"
            height="500"
            frameborder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
        </iframe>
    `;
  } else {
    modelContainer.innerHTML = `
      <div style="
        height:500px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#111;
        border-radius:15px;
      ">
        <h3>3D Model Coming Soon</h3>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const teamsButton = document.querySelector(".has-mega");
  const megaWrapper = document.querySelector(".mega-wrapper");
  const header = document.querySelector(".header");

  if (!teamsButton || !megaWrapper) return;

  let closeTimer;

  function openMega() {
    clearTimeout(closeTimer);
    megaWrapper.classList.add("active");
  }

  function closeMega() {
    megaWrapper.classList.remove("active");
  }

  teamsButton.addEventListener("mouseenter", openMega);

  teamsButton.addEventListener("mouseleave", () => {
    closeTimer = setTimeout(() => {
      if (!megaWrapper.matches(":hover")) {
        closeMega();
      }
    }, 250);
  });

  megaWrapper.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
  });

  megaWrapper.addEventListener("mouseleave", () => {
    closeTimer = setTimeout(closeMega, 250);
  });

  document.addEventListener("click", (e) => {
    if (
      !megaWrapper.contains(e.target) &&
      !teamsButton.contains(e.target)
    ) {
      closeMega();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMega();
    }
  });

});

function renderDriversCarousel() {
  const container = document.getElementById("driversCarousel");
  if (!container || typeof driversData === "undefined") return;

  container.innerHTML = "";

  driversData.forEach(driver => {

    const teamKey = Object.keys(teamsData).find(
      key => teamsData[key].logo === driver.teamLogo
    );

    const teamColor = teamKey ? teamsData[teamKey].color : "#444";

    container.innerHTML += `
      <div class="driver-card" style="--team-color: ${teamColor};">

        <div class="driver-highlight"></div>

        <div class="driver-badges">
          <img class="team-logo-badge" src="${driver.teamLogo}">
          <img class="flag-badge" src="${driver.flag}">
        </div>

        <img class="driver-image" src="${driver.image}">
        
        <div class="driver-name">${driver.name}</div>

      </div>
    `;
  });
}