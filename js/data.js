const teamsData = {

  alpine: {
    name: "Alpine",
    color: "#00A1E8",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/alpine/2026alpinelogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/alpine/2026alpinecarright.webp",
    model3d: "https://sketchfab.com/models/136c818e41bf475595034b487d659c64/embed",
    base: "Enstone, United Kingdom",
    principal: "Bruno Famin",
    powerUnit: "Renault",
    championships: 2,
    drivers: ["Pierre Gasly", "Esteban Ocon"],
    description: "Alpine continues its push toward the front of the grid with a bold blue identity."
  },

  astonmartin: {
    name: "Aston Martin",
    color: "#229971",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/astonmartin/2026astonmartinlogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/astonmartin/2026astonmartincarright.webp",
    model3d: "https://sketchfab.com/models/f6ba825a43b146a9b669934a4e1fd529/embed",
    base: "Silverstone, United Kingdom",
    principal: "Mike Krack",
    powerUnit: "Mercedes",
    championships: 0,
    drivers: ["Fernando Alonso", "Lance Stroll"],
    description: "Aston Martin aims for championship contention with strong technical leadership."
  },

  ferrari: {
    name: "Ferrari",
    color: "#E8002D",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/ferrari/2026ferrarilogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/ferrari/2026ferraricarright.webp",
    model3d: "https://sketchfab.com/models/7929bd7771d8494eaf0eb31404e24bf6/embed",
    base: "Maranello, Italy",
    principal: "Frédéric Vasseur",
    powerUnit: "Ferrari",
    championships: 16,
    drivers: ["Charles Leclerc", "Lewis Hamilton"],
    description: "The most iconic team in Formula 1 history, Ferrari remains a title powerhouse."
  },

  mclaren: {
    name: "McLaren",
    color: "#FF8000",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/mclaren/2026mclarenlogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/mclaren/2026mclarencarright.webp",
    model3d: "https://sketchfab.com/models/c6194270002b401bb25be7e35ab56e34/embed",
    base: "Woking, United Kingdom",
    principal: "Andrea Stella",
    powerUnit: "Mercedes",
    championships: 8,
    drivers: ["Lando Norris", "Oscar Piastri"],
    description: "McLaren blends heritage and innovation in pursuit of championship glory."
  },

  mercedes: {
    name: "Mercedes",
    color: "#00D2BE",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedeslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedescarright.webp",
    model3d: "https://sketchfab.com/models/1abb9746438f45cf8829fe56dfc3374a/embed",
    base: "Brackley, United Kingdom",
    principal: "Toto Wolff",
    powerUnit: "Mercedes",
    championships: 8,
    drivers: ["George Russell", "Kimi Antonelli"],
    description: "The Silver Arrows remain a dominant force in the hybrid era."
  },

  redbull: {
    name: "Red Bull Racing",
    color: "#1E41FF",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/redbullracing/2026redbullracinglogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
    model3d: "https://sketchfab.com/models/e4afe46f3aab4b23a418da06fc163821/embed",
    base: "Milton Keynes, United Kingdom",
    principal: "Christian Horner",
    powerUnit: "Honda RBPT",
    championships: 6,
    drivers: ["Max Verstappen", "Sergio Pérez"],
    description: "Red Bull Racing continues its aggressive dominance with aerodynamic excellence."
  },

  williams: {
    name: "Williams",
    color: "#005AFF",
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/williams/2026williamslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/williams/2026williamscarright.webp",
    model3d: "https://sketchfab.com/models/0bdb3e2a1c244e0bb4851abd3ff7e492/embed",
    base: "Grove, United Kingdom",
    principal: "James Vowles",
    powerUnit: "Mercedes",
    championships: 9,
    drivers: ["Alex Albon", "Carlos Sainz"],
    description: "Williams seeks a return to former championship-winning glory."
  }

};

const driversData = [

  { name: "Lewis Hamilton", team: "Ferrari", country: "gb",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp",
    flag: "https://flagcdn.com/w80/gb.png",
    teamLogo: teamsData.ferrari.logo },

  { name: "Charles Leclerc", team: "Ferrari", country: "mc",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp",
    flag: "https://flagcdn.com/w80/mc.png",
    teamLogo: teamsData.ferrari.logo },

  { name: "Max Verstappen", team: "Red Bull Racing", country: "nl",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp",
    flag: "https://flagcdn.com/w80/nl.png",
    teamLogo: teamsData.redbull.logo },

  { name: "Isack Hadjar", team: "Red Bull Racing", country: "fr",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp",
    flag: "https://flagcdn.com/w80/fr.png",
    teamLogo: teamsData.redbull.logo },

  { name: "George Russell", team: "Mercedes", country: "gb",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp",
    flag: "https://flagcdn.com/w80/gb.png",
    teamLogo: teamsData.mercedes.logo },

  { name: "Kimi Antonelli", team: "Mercedes", country: "it",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp",
    flag: "https://flagcdn.com/w80/it.png",
    teamLogo: teamsData.mercedes.logo },

  { name: "Lando Norris", team: "McLaren", country: "gb",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp",
    flag: "https://flagcdn.com/w80/gb.png",
    teamLogo: teamsData.mclaren.logo },

  { name: "Oscar Piastri", team: "McLaren", country: "au",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp",
    flag: "https://flagcdn.com/w80/au.png",
    teamLogo: teamsData.mclaren.logo },

  { name: "Fernando Alonso", team: "Aston Martin", country: "es",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp",
    flag: "https://flagcdn.com/w80/es.png",
    teamLogo: teamsData.astonmartin.logo },

  { name: "Lance Stroll", team: "Aston Martin", country: "ca",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp",
    flag: "https://flagcdn.com/w80/ca.png",
    teamLogo: teamsData.astonmartin.logo },

  { name: "Pierre Gasly", team: "Alpine", country: "fr",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp",
    flag: "https://flagcdn.com/w80/fr.png",
    teamLogo: teamsData.alpine.logo },

  { name: "Franco Colapinto", team: "Alpine", country: "ar",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp",
    flag: "https://flagcdn.com/w80/ar.png",
    teamLogo: teamsData.alpine.logo },

  { name: "Alexander Albon", team: "Williams", country: "th",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp",
    flag: "https://flagcdn.com/w80/th.png",
    teamLogo: teamsData.williams.logo },

  { name: "Carlos Sainz", team: "Williams", country: "es",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp",
    flag: "https://flagcdn.com/w80/es.png",
    teamLogo: teamsData.williams.logo }

];