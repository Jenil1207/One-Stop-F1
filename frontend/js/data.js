const teamsData = {
  alpine: {
    name: "Alpine", color: "#00A1E8", points: 10,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/alpine/2026alpinelogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/alpine/2026alpinecarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/alpine/2026alpinecarright.webp",
    model3d: "", base: "Enstone, United Kingdom", principal: "Bruno Famin", powerUnit: "Renault", championships: 2, firstEntry: 1981,
    drivers: ["Pierre Gasly", "Franco Colapinto"], description: "Alpine continues its push toward the front of the grid with a bold blue identity and renewed ambition."
  },
  astonmartin: {
    name: "Aston Martin", color: "#229971", points: 20,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/astonmartin/2026astonmartinlogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/astonmartin/2026astonmartincarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/astonmartin/2026astonmartincarright.webp",
    model3d: "", base: "Silverstone, United Kingdom", principal: "Mike Krack", powerUnit: "Mercedes", championships: 0, firstEntry: 2018,
    drivers: ["Fernando Alonso", "Lance Stroll"], description: "Aston Martin aims for championship contention backed by strong technical leadership and investment."
  },
  ferrari: {
    name: "Ferrari", color: "#E8002D", points: 76,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/ferrari/2026ferrarilogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/ferrari/2026ferraricarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/ferrari/2026ferraricarright.webp",
    model3d: "", base: "Maranello, Italy", principal: "Frederic Vasseur", powerUnit: "Ferrari", championships: 16, firstEntry: 1950,
    drivers: ["Charles Leclerc", "Lewis Hamilton"], description: "The most iconic team in Formula 1 history. Ferrari remains a dominant force and perennial title contender."
  },
  mclaren: {
    name: "McLaren", color: "#FF8000", points: 48,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/mclaren/2026mclarenlogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/mclaren/2026mclarencarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/mclaren/2026mclarencarright.webp",
    model3d: "", base: "Woking, United Kingdom", principal: "Andrea Stella", powerUnit: "Mercedes", championships: 8, firstEntry: 1966,
    drivers: ["Lando Norris", "Oscar Piastri"], description: "McLaren blends rich heritage with cutting-edge innovation in an unrelenting pursuit of championship glory."
  },
  mercedes: {
    name: "Mercedes", color: "#27F4D2", points: 55,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedeslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedescarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedescarright.webp",
    model3d: "", base: "Brackley, United Kingdom", principal: "Toto Wolff", powerUnit: "Mercedes", championships: 8, firstEntry: 1954,
    drivers: ["George Russell", "Kimi Antonelli"], description: "The Silver Arrows are the most successful team of the modern hybrid era, chasing a return to the summit."
  },
  redbull: {
    name: "Red Bull Racing", color: "#3671C6", points: 62,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/redbullracing/2026redbullracinglogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/redbullracing/2026redbullracingcarright.webp",
    model3d: "", base: "Milton Keynes, United Kingdom", principal: "Christian Horner", powerUnit: "Honda RBPT", championships: 6, firstEntry: 2005,
    drivers: ["Max Verstappen", "Isack Hadjar"], description: "Red Bull Racing continues its aggressive dominance with relentless aerodynamic development and team culture."
  },
  williams: {
    name: "Williams", color: "#00A0DE", points: 6,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/williams/2026williamslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/williams/2026williamscarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/williams/2026williamscarright.webp",
    model3d: "", base: "Grove, United Kingdom", principal: "James Vowles", powerUnit: "Mercedes", championships: 9, firstEntry: 1978,
    drivers: ["Alexander Albon", "Carlos Sainz"], description: "A storied British constructor seeking a grand return to championship-winning glory under new leadership."
  },
  haas: {
    name: "Haas F1 Team", color: "#B6BABD", points: 4,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/haas/2026haaslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/haas/2026haascarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/haas/2026haascarright.webp",
    model3d: "", base: "Kannapolis, USA", principal: "Ayao Komatsu", powerUnit: "Ferrari", championships: 0, firstEntry: 2016,
    drivers: ["Esteban Ocon", "Oliver Bearman"], description: "The only American-owned team on the grid, Haas continues to grow with Toyota power and fresh young talent."
  },
  racingbulls: {
    name: "Racing Bulls", color: "#1534CC", points: 2,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/racingbulls/2026racingbullslogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/racingbulls/2026racingbullscarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/racingbulls/2026racingbullscarright.webp",
    model3d: "", base: "Faenza, Italy", principal: "Laurent Mekies", powerUnit: "Honda RBPT", championships: 0, firstEntry: 2006,
    drivers: ["Liam Lawson", "Arvid Lindblad"], description: "Red Bull second team Racing Bulls serves as a dynamic proving ground for up-and-coming talent."
  },
  audi: {
    name: "Audi", color: "#F50537", points: 0,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/audi/2026audilogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/audi/2026audicarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/audi/2026audicarright.webp",
    model3d: "", base: "Neuburg, Germany", principal: "Mattia Binotto", powerUnit: "Audi", championships: 0, firstEntry: 2026,
    drivers: ["Nico Hulkenberg", "Gabriel Bortoleto"], description: "Audi enters Formula 1 as a works team in 2026, marking one of the sport most anticipated manufacturer debuts."
  },
  cadillac: {
    name: "Cadillac", color: "#FFB81C", points: 0,
    logo: "https://media.formula1.com/image/upload/c_lfill,w_48/q_auto/v1740000000/common/f1/2026/cadillac/2026cadillaclogowhite.webp",
    car: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/cadillac/2026cadillaccarright.webp",
    carLarge: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/cadillac/2026cadillaccarright.webp",
    model3d: "", base: "Indianapolis, USA", principal: "Graeme Lowdon", powerUnit: "GM / Ferrari", championships: 0, firstEntry: 2026,
    drivers: ["Sergio Perez", "Valtteri Bottas"], description: "Cadillac joins the 2026 grid as F1 11th constructor, backed by General Motors in a landmark return for American motorsport."
  }
};

const driversData = [
  { name: "Max Verstappen", number: 1, team: "Red Bull Racing", country: "nl", nationality: "Dutch", dob: "30 Sep 1997", hometown: "Hasselt, Belgium", points: 43, bio: "The three-time world champion and dominant force in Formula 1. Max Verstappen joined Red Bull Racing in 2016 and went on to become the most dominant driver in the modern era, winning championships from 2021-2023.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/redbullracing/maxver01/2026redbullracingmaxver01right.webp", flag: "https://flagcdn.com/w80/nl.png", teamLogo: teamsData.redbull.logo },
  { name: "Kimi Antonelli", number: 12, team: "Mercedes", country: "it", nationality: "Italian", dob: "25 Aug 2006", hometown: "Bologna, Italy", points: 38, bio: "Kimi Andrea Antonelli is the youngest Mercedes driver in history. A prodigious talent who rose through karting and junior formulae at breakneck speed, Antonelli claimed his maiden F1 victory at just 18 years old in Shanghai.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp", flag: "https://flagcdn.com/w80/it.png", teamLogo: teamsData.mercedes.logo },
  { name: "Charles Leclerc", number: 16, team: "Ferrari", country: "mc", nationality: "Monegasque", dob: "16 Oct 1997", hometown: "Monaco", points: 37, bio: "Monaco own Charles Leclerc is a Ferrari icon in the making. A two-time pole position record holder, Leclerc drives with extraordinary natural pace and racecraft. His partnership with Lewis Hamilton in 2026 is one of the most exciting in the paddock.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/ferrari/chalec01/2026ferrarichalec01right.webp", flag: "https://flagcdn.com/w80/mc.png", teamLogo: teamsData.ferrari.logo },
  { name: "Lewis Hamilton", number: 44, team: "Ferrari", country: "gb", nationality: "British", dob: "7 Jan 1985", hometown: "Stevenage, England", points: 34, bio: "Seven-time Formula 1 World Champion and the most successful driver in the sport history. Lewis Hamilton made a seismic move to Ferrari in 2026, chasing an elusive eighth title with the Scuderia after 11 iconic seasons with Mercedes.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp", flag: "https://flagcdn.com/w80/gb.png", teamLogo: teamsData.ferrari.logo },
  { name: "Oscar Piastri", number: 81, team: "McLaren", country: "au", nationality: "Australian", dob: "6 Apr 2001", hometown: "Melbourne, Australia", points: 25, bio: "The reigning F2 and F3 champion who burst onto the F1 scene with McLaren. Oscar Piastri is calm, methodical, and devastatingly quick. He is widely tipped as a future world champion and is already giving Lando Norris the hardest fight of his career.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp", flag: "https://flagcdn.com/w80/au.png", teamLogo: teamsData.mclaren.logo },
  { name: "Lando Norris", number: 4, team: "McLaren", country: "gb", nationality: "British", dob: "13 Nov 1999", hometown: "Bristol, England", points: 23, bio: "Lando Norris is McLaren fan-favourite and the team technical leader. With his electric personality and blistering pace, Norris is consistently one of the fastest drivers on the grid. His 2024 race wins marked a major turning point in his career.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp", flag: "https://flagcdn.com/w80/gb.png", teamLogo: teamsData.mclaren.logo },
  { name: "George Russell", number: 63, team: "Mercedes", country: "gb", nationality: "British", dob: "15 Feb 1998", hometown: "King Lynn, England", points: 17, bio: "The cool, calculating George Russell is one of the defining intelligences in Formula 1. A Williams graduate who made his name battling in uncompetitive machinery, Russell stepped up to Mercedes in 2022 and won his first Grand Prix in his debut season.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp", flag: "https://flagcdn.com/w80/gb.png", teamLogo: teamsData.mercedes.logo },
  { name: "Isack Hadjar", number: 6, team: "Red Bull Racing", country: "fr", nationality: "French", dob: "28 Sep 2004", hometown: "Paris, France", points: 16, bio: "The 2024 Formula 2 champion and Red Bull junior. Isack Hadjar brings exceptional racecraft and maturity beyond his years to the top flight. A driver who impressed greatly in his F2 championship-winning season.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/redbullracing/isahad01/2026redbullracingisahad01right.webp", flag: "https://flagcdn.com/w80/fr.png", teamLogo: teamsData.redbull.logo },
  { name: "Fernando Alonso", number: 14, team: "Aston Martin", country: "es", nationality: "Spanish", dob: "29 Jul 1981", hometown: "Oviedo, Spain", points: 12, bio: "A living legend of Formula 1. Fernando Alonso won back-to-back world championships in 2005 and 2006 and has remained competitive at the highest level for two decades. Always combative, he continues to prove that age is just a number.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/astonmartin/feralo01/2026astonmartinferalo01right.webp", flag: "https://flagcdn.com/w80/es.png", teamLogo: teamsData.astonmartin.logo },
  { name: "Lance Stroll", number: 18, team: "Aston Martin", country: "ca", nationality: "Canadian", dob: "29 Oct 1998", hometown: "Montreal, Canada", points: 8, bio: "Lance Stroll has grown into a consistent points scorer and effective team leader. Supported by his father Lawrence Stroll ownership of Aston Martin, Stroll evolved significantly as a driver and became a key co-architect of the team 2026 car.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/astonmartin/lanstr01/2026astonmartinlanstr01right.webp", flag: "https://flagcdn.com/w80/ca.png", teamLogo: teamsData.astonmartin.logo },
  { name: "Pierre Gasly", number: 10, team: "Alpine", country: "fr", nationality: "French", dob: "7 Feb 1996", hometown: "Rouen, France", points: 6, bio: "Pierre Gasly is a driver defined by resilience. After a difficult stint at Red Bull Racing, Gasly rebuilt his career spectacularly at AlphaTauri, winning his first Grand Prix at Monza in 2020. He now leads Alpine charge at the front of the grid.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/alpine/piegas01/2026alpinepiegas01right.webp", flag: "https://flagcdn.com/w80/fr.png", teamLogo: teamsData.alpine.logo },
  { name: "Franco Colapinto", number: 43, team: "Alpine", country: "ar", nationality: "Argentine", dob: "27 May 2003", hometown: "Buenos Aires", points: 4, bio: "Argentina new F1 hero. Franco Colapinto burst onto the Formula 1 scene mid-2024 with Williams and immediately turned heads with his ferocious pace. Now at Alpine for the 2026 season, the entirety of South America is cheering him on.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/alpine/fracol01/2026alpinefracol01right.webp", flag: "https://flagcdn.com/w80/ar.png", teamLogo: teamsData.alpine.logo },
  { name: "Alexander Albon", number: 23, team: "Williams", country: "th", nationality: "Thai", dob: "23 Mar 1996", hometown: "London, England", points: 4, bio: "Alexander Albon is the unsung hero of the grid. After returning from a year away from the sport, Albon has revitalized Williams and consistently extracts performances far beyond what his car deserves. One of the most respected characters in the paddock.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp", flag: "https://flagcdn.com/w80/th.png", teamLogo: teamsData.williams.logo },
  { name: "Carlos Sainz", number: 55, team: "Williams", country: "es", nationality: "Spanish", dob: "1 Sep 1994", hometown: "Madrid, Spain", points: 2, bio: "Smooth, methodical and remarkably consistent, Carlos Sainz Jr. is the son of rally legend Carlos Sainz Sr. After a successful five years at Ferrari including a race win at Silverstone, Sainz joined Williams for 2026 with his eyes firmly on a podium.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/williams/carsai01/2026williamscarsai01right.webp", flag: "https://flagcdn.com/w80/es.png", teamLogo: teamsData.williams.logo },
  { name: "Esteban Ocon", number: 31, team: "Haas F1 Team", country: "fr", nationality: "French", dob: "17 Sep 1996", hometown: "Evreux, France", points: 2, bio: "A fierce competitor who never gives up, Esteban Ocon has been a fighter throughout his career. His 2021 Hungarian Grand Prix win remains one of the most dramatic in recent memory. Ocon brings experience and grit to the revamped Haas outfit.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/haas/estoco01/2026haasestoco01right.webp", flag: "https://flagcdn.com/w80/fr.png", teamLogo: teamsData.haas.logo },
  { name: "Oliver Bearman", number: 87, team: "Haas F1 Team", country: "gb", nationality: "British", dob: "8 May 2005", hometown: "Chelmsford, England", points: 2, bio: "Oliver Bearman became the youngest British driver to score F1 points with his stunning debut substitute drive for Ferrari in the 2024 Saudi Arabian Grand Prix. He joined Haas full-time in 2026 and immediately impressed with his racecraft and composure.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/haas/olibea01/2026haasolibea01right.webp", flag: "https://flagcdn.com/w80/gb.png", teamLogo: teamsData.haas.logo },
  { name: "Liam Lawson", number: 30, team: "Racing Bulls", country: "nz", nationality: "New Zealander", dob: "11 Feb 2002", hometown: "Hastings, NZ", points: 1, bio: "New Zealand newest F1 star, Liam Lawson proved his talent in his substitute appearances and has now earned a full-time seat at Racing Bulls. Known for his uncanny sense of tyre management and race pace, Lawson is a driver going places fast.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/racingbulls/lialaw01/2026racingbullslialaw01right.webp", flag: "https://flagcdn.com/w80/nz.png", teamLogo: teamsData.racingbulls.logo },
  { name: "Arvid Lindblad", number: 7, team: "Racing Bulls", country: "gb", nationality: "British-Swedish", dob: "2 Mar 2007", hometown: "London, England", points: 1, bio: "Britain next F1 talent, Arvid Lindblad is the youngest driver on the 2026 grid. A Red Bull junior who rocketed through the junior categories, Lindblad is already drawing comparisons to Max Verstappen in terms of his precocious talent and race awareness.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp", flag: "https://flagcdn.com/w80/gb.png", teamLogo: teamsData.racingbulls.logo },
  { name: "Nico Hulkenberg", number: 27, team: "Audi", country: "de", nationality: "German", dob: "19 Aug 1987", hometown: "Emmerich, Germany", points: 0, bio: "The veteran of the grid, Nico Hulkenberg has been one of Formula 1 most underrated performers for over a decade. Now at the helm of Audi pioneering F1 project, the Hulk carries the hopes of an F1 powerhouse-in-the-making into 2026.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/audi/nichul01/2026audinichul01right.webp", flag: "https://flagcdn.com/w80/de.png", teamLogo: teamsData.audi.logo },
  { name: "Gabriel Bortoleto", number: 5, team: "Audi", country: "br", nationality: "Brazilian", dob: "14 Oct 2004", hometown: "Sao Paulo, Brazil", points: 0, bio: "The 2024 Formula 2 champion from Brazil. Gabriel Bortoleto is a supremely gifted driver who was guided early in his career by Fernando Alonso. His raw pace and overtaking ability made him one of the most coveted talents on the market.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/audi/gabbor01/2026audigabbor01right.webp", flag: "https://flagcdn.com/w80/br.png", teamLogo: teamsData.audi.logo },
  { name: "Sergio Perez", number: 11, team: "Cadillac", country: "mx", nationality: "Mexican", dob: "26 Jan 1990", hometown: "Guadalajara, Mexico", points: 0, bio: "A former Grand Prix winner and the most successful Mexican driver in Formula 1 history. Sergio Perez is beloved by Mexico and the entire Latin American racing community. He brings experience and street circuit brilliance to the new Cadillac F1 team.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/cadillac/serper01/2026cadillacserper01right.webp", flag: "https://flagcdn.com/w80/mx.png", teamLogo: teamsData.cadillac.logo },
  { name: "Valtteri Bottas", number: 77, team: "Cadillac", country: "fi", nationality: "Finnish", dob: "28 Aug 1989", hometown: "Nastola, Finland", points: 0, bio: "A consistent Grand Prix winner and a key figure in Mercedes dominant empire of the 2010s. Valtteri Bottas is an experienced head in the Cadillac cockpit, bringing crucial development feedback to help build the fledgling American team inaugural campaign.", image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/cadillac/valbot01/2026cadillacvalbot01right.webp", flag: "https://flagcdn.com/w80/fi.png", teamLogo: teamsData.cadillac.logo }
];

const scheduleData = [
  { round: "Round 01", name: "Australian Grand Prix", circuit: "Albert Park Circuit", country: "Australia", flag: "AUS", date: "15 Mar 2026", laps: 58, distance: "307.574 km", status: "completed", winner: "M. Verstappen" },
  { round: "Round 02", name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", country: "China", flag: "CHN", date: "22 Mar 2026", laps: 56, distance: "305.066 km", status: "completed", winner: "K. Antonelli" },
  { round: "Round 03", name: "Japanese Grand Prix", circuit: "Suzuka Circuit", country: "Japan", flag: "JPN", date: "5 Apr 2026", laps: 53, distance: "307.471 km", status: "completed", winner: "C. Leclerc" },
  { round: "Round 04", name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", country: "Bahrain", flag: "BHR", date: "19 Apr 2026", laps: 57, distance: "308.238 km", status: "completed", winner: "M. Verstappen" },
  { round: "Round 05", name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", country: "Saudi Arabia", flag: "SAU", date: "26 Apr 2026", laps: 50, distance: "308.450 km", status: "next", winner: null },
  { round: "Round 06", name: "Miami Grand Prix", circuit: "Miami International Autodrome", country: "USA", flag: "USA", date: "10 May 2026", laps: 57, distance: "308.326 km", status: "upcoming", winner: null },
  { round: "Round 07", name: "Emilia-Romagna Grand Prix", circuit: "Autodromo Enzo e Dino Ferrari", country: "Italy", flag: "ITA", date: "24 May 2026", laps: 63, distance: "309.049 km", status: "upcoming", winner: null },
  { round: "Round 08", name: "Monaco Grand Prix", circuit: "Circuit de Monaco", country: "Monaco", flag: "MON", date: "31 May 2026", laps: 78, distance: "260.286 km", status: "upcoming", winner: null },
  { round: "Round 09", name: "Spanish Grand Prix", circuit: "Circuit Barcelona-Catalunya", country: "Spain", flag: "ESP", date: "14 Jun 2026", laps: 66, distance: "307.236 km", status: "upcoming", winner: null },
  { round: "Round 10", name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", country: "Canada", flag: "CAN", date: "28 Jun 2026", laps: 70, distance: "305.270 km", status: "upcoming", winner: null },
  { round: "Round 11", name: "Austrian Grand Prix", circuit: "Red Bull Ring", country: "Austria", flag: "AUT", date: "12 Jul 2026", laps: 71, distance: "306.452 km", status: "upcoming", winner: null },
  { round: "Round 12", name: "British Grand Prix", circuit: "Silverstone Circuit", country: "UK", flag: "GBR", date: "19 Jul 2026", laps: 52, distance: "306.198 km", status: "upcoming", winner: null },
  { round: "Round 13", name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", country: "Belgium", flag: "BEL", date: "2 Aug 2026", laps: 44, distance: "308.052 km", status: "upcoming", winner: null },
  { round: "Round 14", name: "Hungarian Grand Prix", circuit: "Hungaroring", country: "Hungary", flag: "HUN", date: "16 Aug 2026", laps: 70, distance: "306.630 km", status: "upcoming", winner: null },
  { round: "Round 15", name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", country: "Netherlands", flag: "NLD", date: "30 Aug 2026", laps: 72, distance: "306.648 km", status: "upcoming", winner: null },
  { round: "Round 16", name: "Italian Grand Prix", circuit: "Autodromo Nazionale Monza", country: "Italy", flag: "ITA", date: "13 Sep 2026", laps: 53, distance: "306.720 km", status: "upcoming", winner: null },
  { round: "Round 17", name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", country: "Azerbaijan", flag: "AZE", date: "27 Sep 2026", laps: 51, distance: "306.049 km", status: "upcoming", winner: null },
  { round: "Round 18", name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", country: "Singapore", flag: "SGP", date: "11 Oct 2026", laps: 62, distance: "308.706 km", status: "upcoming", winner: null },
  { round: "Round 19", name: "United States Grand Prix", circuit: "Circuit of the Americas", country: "USA", flag: "USA", date: "25 Oct 2026", laps: 56, distance: "308.405 km", status: "upcoming", winner: null },
  { round: "Round 20", name: "Mexico City Grand Prix", circuit: "Autodromo Hermanos Rodriguez", country: "Mexico", flag: "MEX", date: "1 Nov 2026", laps: 71, distance: "305.354 km", status: "upcoming", winner: null },
  { round: "Round 21", name: "Sao Paulo Grand Prix", circuit: "Autodromo Jose Carlos Pace", country: "Brazil", flag: "BRA", date: "15 Nov 2026", laps: 71, distance: "305.879 km", status: "upcoming", winner: null },
  { round: "Round 22", name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", country: "USA", flag: "USA", date: "22 Nov 2026", laps: 50, distance: "309.958 km", status: "upcoming", winner: null },
  { round: "Round 23", name: "Qatar Grand Prix", circuit: "Losail International Circuit", country: "Qatar", flag: "QAT", date: "29 Nov 2026", laps: 57, distance: "308.611 km", status: "upcoming", winner: null },
  { round: "Round 24", name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", country: "UAE", flag: "ARE", date: "13 Dec 2026", laps: 58, distance: "306.183 km", status: "upcoming", winner: null }
];

const newsData = [
  {
    tag: "Race Report",
    title: "Antonelli Claims Maiden Victory in a Thrilling Chinese Grand Prix",
    body: "Kimi Antonelli crossed the line to claim a stunning maiden Formula 1 victory at the Chinese Grand Prix, becoming the youngest race winner for Mercedes. The 18-year-old Italian drove a flawless 56-lap race at Shanghai International Circuit, holding off a charging Max Verstappen in the final laps. Mercedes strategy team executed a brilliantly timed pit stop that gave Antonelli track position he never relinquished.",
    meta: "22 Mar 2026 · Race Report", featured: true, emoji: "trophy",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp"
  },
  {
    tag: "Technical",
    title: "The clever pit-wall call that secured Antonelli first win",
    body: "Mercedes decision to pit Antonelli on lap 32 under a virtual safety car period proved decisive. The undercut perfectly leapfrogged both Ferrari drivers, giving the young Italian a 4.2-second gap that he promptly extended. Toto Wolff later described it as one of our best strategic calls in years.",
    meta: "22 Mar 2026 · Analysis", emoji: "wrench",
    image: "https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000000/common/f1/2026/mercedes/2026mercedescarright.webp"
  },
  {
    tag: "Power Rankings",
    title: "Who impressed our Power Rankings judges in China?",
    body: "Our panel of expert judges rates every driver after each race weekend. Antonelli tops the charts with a perfect 10 following his maiden win. Verstappen earns high praise for his relentless pressure in the final laps despite a tyre disadvantage.",
    meta: "23 Mar 2026 · Inside F1", emoji: "chart",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp"
  },
  {
    tag: "Driver News",
    title: "Hamilton admits Ferrari still getting to know each other after Australia",
    body: "Seven-time world champion Lewis Hamilton says he and the Ferrari team are still finding their groove in his first season with the Scuderia. Despite a challenging Australian opener that saw him finish fifth, Hamilton remains bullish about the team development direction.",
    meta: "20 Mar 2026 · Driver News", emoji: "car",
    image: "https://media.formula1.com/image/upload/c_fill,h_600,q_auto/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp"
  },
  {
    tag: "Team News",
    title: "Audi reveals their first full F1 car ahead of the 2026 season",
    body: "Audi officially unveiled their first-ever Formula 1 challenger with a spectacular launch event in Ingolstadt. The car features a striking livery under new team principal Mattia Binotto. Nico Hulkenberg and rookie Gabriel Bortoleto will pilot the machine throughout the season.",
    meta: "18 Feb 2026 · Team News", emoji: "car",
    image: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/audi/2026audicarright.webp"
  },
  {
    tag: "Season Preview",
    title: "Cadillac ready to make their mark as F1 11th team",
    body: "American motorsport returns to Formula 1 in style as Cadillac, backed by General Motors, prepares to take on the established order. With Sergio Perez and Valtteri Bottas at the wheel, expectations are measured but ambitions are sky-high at the new Indianapolis-based outfit.",
    meta: "1 Mar 2026 · Season Preview", emoji: "flag",
    image: "https://media.formula1.com/image/upload/c_lfill,h_500/q_auto/v1740000000/common/f1/2026/cadillac/2026cadillaccarright.webp"
  },
  {
    tag: "Race Preview",
    title: "Japanese Grand Prix: Everything you need to know",
    body: "Suzuka beckons! One of the most beloved circuits on the calendar returns for Round 3. The iconic figure-of-eight layout tests every dimension of car performance. With new regulations in 2026, teams are still learning how their cars behave at high-speed sweepers like 130R.",
    meta: "3 Apr 2026 · Race Preview", emoji: "flag",
    image: "https://media.formula1.com/image/upload/t_16by9North/f_auto/q_auto/v1724691062/fom-website/2024/Netherlands/GettyImages-1645160995.jpg"
  },
  {
    tag: "Regulations",
    title: "How the 2026 technical regulations are transforming F1",
    body: "The 2026 season marks F1 most significant rule change in a decade. Smaller cars, new power unit regulations with a 50/50 split between electrical and combustion energy, and a complete aerodynamic reset. We break down what the changes mean for each team.",
    meta: "15 Feb 2026 · Technical", emoji: "gear",
    image: "https://img.icons8.com/ios_filled/512/FFFFFF/formula-1.png"
  },
  {
    tag: "Inside F1",
    title: "The full 2026 F1 calendar: 24 races, 6 continents",
    body: "The 2026 Formula 1 season is the most globe-spanning in the sport history. From Melbourne to Abu Dhabi, through 24 breathtaking venues. We take a closer look at the logistics challenge behind running the biggest season ever.",
    meta: "10 Jan 2026 · Inside F1", emoji: "globe",
    image: "https://img.icons8.com/ios_filled/512/FFFFFF/formula-1.png"
  }
];
