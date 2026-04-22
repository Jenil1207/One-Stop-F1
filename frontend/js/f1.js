import { getSchedule, getStandings, getPoints } from "./api.js";

console.log("F1 script is running");

const scheduleContainer = document.querySelector("#schedule");
const standingsContainer = document.querySelector("#standings");
const pointsContainer = document.querySelector("#points");
const refreshButton = document.querySelector("#refresh-data");
const statusText = document.querySelector("#status");

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function setLoading() {
  scheduleContainer.innerHTML = "<p>Loading...</p>";
  standingsContainer.innerHTML = "<p>Loading...</p>";
  pointsContainer.innerHTML = "<p>Loading...</p>";
  statusText.textContent = "Loading latest OpenF1 data...";
  refreshButton.disabled = true;
}

function setError() {
  scheduleContainer.innerHTML = "<p>Failed to load data</p>";
  standingsContainer.innerHTML = "<p>Failed to load data</p>";
  pointsContainer.innerHTML = "<p>Failed to load data</p>";
  statusText.textContent = "Failed to load data";
  refreshButton.disabled = false;
}

function formatDate(dateValue) {
  if (!dateValue) return "Date TBC";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date TBC";

  return dateFormatter.format(date);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emptyMessage(message) {
  return `<p class="empty">${escapeHtml(message)}</p>`;
}

function makeTable(headers, rows) {
  if (!rows.length) {
    return emptyMessage("No data available yet.");
  }

  const tableHeaders = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const tableRows = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `
    <table>
      <thead>
        <tr>${tableHeaders}</tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;
}

export function renderSchedule(data) {
  if (!data.length) {
    scheduleContainer.innerHTML = emptyMessage("No race schedule found.");
    return;
  }

  scheduleContainer.innerHTML = data
    .map(
      (race) => `
        <article class="race-card">
          <div>
            <h3>${escapeHtml(race.raceName)}</h3>
            <p>${escapeHtml(race.location)}</p>
          </div>
          <div>
            <strong>${escapeHtml(formatDate(race.date))}</strong>
            <span>${escapeHtml(race.circuit)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

export function renderStandings(data) {
  const driverRows = data.drivers.map((driver) => [
    driver.position,
    driver.driverName,
    driver.team,
    driver.points,
  ]);

  const constructorRows = data.constructors.map((constructor) => [
    constructor.position,
    constructor.team,
    constructor.points,
  ]);

  standingsContainer.innerHTML = `
    <div class="standings-grid">
      <section>
        <h3>Driver Standings</h3>
        ${makeTable(["Pos", "Driver", "Team", "Pts"], driverRows)}
      </section>
      <section>
        <h3>Constructor Standings</h3>
        ${makeTable(["Pos", "Constructor", "Pts"], constructorRows)}
      </section>
    </div>
  `;
}

export function renderPoints(data) {
  const rows = data.points.map((driver, index) => [
    index + 1,
    driver.driverName,
    driver.totalPoints,
  ]);

  pointsContainer.innerHTML = makeTable(["Rank", "Driver", "Total Points"], rows);
}

async function loadF1Data() {
  setLoading();

  try {
    const [schedule, standings, points] = await Promise.all([
      getSchedule(),
      getStandings(),
      getPoints(),
    ]);

    renderSchedule(schedule);
    renderStandings(standings);
    renderPoints(points);
    statusText.textContent = `Updated from OpenF1. Standings derived from ${standings.derivedFromSessions} completed Race/Sprint sessions.`;
  } catch (error) {
    console.error("Unable to render F1 data:", error);
    setError();
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadF1Data);
loadF1Data();
