const JOLPICA_BASE_URL = "https://api.jolpi.ca/ergast/f1/2025";

async function fetchJolpica(endpoint) {
  try {
    const response = await fetch(`${JOLPICA_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Jolpica API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch from Jolpica:", err);
    return null;
  }
}

async function getJolpicaSchedule() {
  const data = await fetchJolpica('.json');
  if (!data) return [];
  return data.MRData.RaceTable.Races;
}

async function getJolpicaDriverStandings() {
  const data = await fetchJolpica('/driverStandings.json');
  if (!data || !data.MRData.StandingsTable.StandingsLists[0]) return [];
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

async function getJolpicaConstructorStandings() {
  const data = await fetchJolpica('/constructorStandings.json');
  if (!data || !data.MRData.StandingsTable.StandingsLists[0]) return [];
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
