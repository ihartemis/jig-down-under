export interface Stop {
  id: string;
  date: string;
  dateShort: string;
  // Start/end dates for tracking current position (NZST dates, inclusive)
  startDate: string; // "2026-04-06"
  endDate: string;   // "2026-04-10"
  location: string;
  region: string;
  coords: [number, number];
  nights: number;
  driveTime?: string;
  type: "stay" | "waypoint" | "flight";
  highlight: string;
  details: string[];
  phase: "flight" | "nelson" | "golden-bay" | "west-coast" | "arthurs-pass" | "christchurch" | "melbourne";
}

export const stops: Stop[] = [
  {
    id: "slc-departure",
    date: "April 4–5",
    dateShort: "Apr 4",
    startDate: "2026-04-04",
    endDate: "2026-04-05",
    location: "Salt Lake City → Auckland",
    region: "Up, up, and away",
    coords: [40.7608, -111.891],
    nights: 0,
    type: "flight",
    highlight: "The great migration south begins",
    details: [
      "Evening flight SLC → LAX, then overnight LAX → Auckland",
      "Griffin's first time crossing the equator (and the date line)",
      "Arriving Apr 6 after losing a whole day to time zones",
    ],
    phase: "flight",
  },
  {
    id: "nelson",
    date: "April 6–10",
    dateShort: "Apr 6–10",
    startDate: "2026-04-06",
    endDate: "2026-04-10",
    location: "Nelson",
    region: "Supplejack Gardens, Upper Moutere",
    coords: [-41.2628, 173.0639],
    nights: 4,
    type: "stay",
    highlight: "Beaches, breweries & beating jet lag",
    details: [
      "Landing in the sunniest city in NZ",
      "Tahunanui Beach — playground right on the sand",
      "Abel Tasman cruise through golden bays, seals & dolphins",
      "Pic's Peanut Butter World (yes, it's a real place)",
      "The Free House — craft beer in a converted church",
      "Jens Hansen — the workshop that forged the One Ring",
    ],
    phase: "nelson",
  },
  {
    id: "takaka",
    date: "April 11–12",
    dateShort: "Apr 11–12",
    startDate: "2026-04-11",
    endDate: "2026-04-12",
    location: "Golden Bay",
    region: "Collingwood",
    coords: [-40.8572, 172.8028],
    nights: 2,
    driveTime: "1.5 hrs over Takaka Hill",
    type: "stay",
    highlight: "Clearest springs in the world & golden sand",
    details: [
      "White-knuckle drive over Takaka Hill (worth it)",
      "Te Waikoropupu Springs — the clearest freshwater on Earth",
      "Pohara Beach — shallow, warm, Griffin-approved",
      "Wainui Falls hike through the bush",
      "Mussel Inn for wood-fired food & local brews",
    ],
    phase: "golden-bay",
  },
  {
    id: "murchison",
    date: "April 13",
    dateShort: "Apr 13",
    startDate: "2026-04-13",
    endDate: "2026-04-13",
    location: "Murchison",
    region: "Lunch stop",
    coords: [-41.8025, 172.327],
    nights: 0,
    type: "waypoint",
    highlight: "Pies & the longest swingbridge in NZ",
    details: [
      "Small river town, big bakery energy",
      "Buller Gorge Swingbridge — if Griffin is awake for it",
    ],
    phase: "west-coast",
  },
  {
    id: "reefton",
    date: "April 13",
    dateShort: "Apr 13",
    startDate: "2026-04-13",
    endDate: "2026-04-13",
    location: "Reefton",
    region: "West Coast",
    coords: [-42.1167, 171.8628],
    nights: 1,
    driveTime: "3.75 hrs from Takaka",
    type: "stay",
    highlight: "A town stuck in a time loop",
    details: [
      "Historic gold mining town frozen in time",
      "Heritage walks through old buildings & quirky pubs",
      "The kind of place where NZ still feels like NZ",
    ],
    phase: "west-coast",
  },
  {
    id: "blackball",
    date: "April 14",
    dateShort: "Apr 14",
    startDate: "2026-04-14",
    endDate: "2026-04-14",
    location: "Blackball",
    region: "West Coast",
    coords: [-42.3361, 171.3539],
    nights: 0,
    type: "waypoint",
    highlight: "Coal town, fifty years in the past",
    details: [
      "Tiny mining town that feels like NZ 50 years ago",
      "The valley down to the coast is beautiful",
    ],
    phase: "west-coast",
  },
  {
    id: "barrytown",
    date: "April 14",
    dateShort: "Apr 14",
    startDate: "2026-04-14",
    endDate: "2026-04-14",
    location: "Barrytown",
    region: "West Coast bush",
    coords: [-42.345, 171.234],
    nights: 1,
    driveTime: "1.25 hrs from Reefton",
    type: "stay",
    highlight: "Sleeping in the bush on the wild West Coast",
    details: [
      "Bush Airbnb on the mountain side — rivers, birds, silence",
      "Beaches, swimming holes & forest walks",
      "The West Coast is rugged, remote & completely magic",
    ],
    phase: "west-coast",
  },
  {
    id: "arthurs-pass",
    date: "April 15",
    dateShort: "Apr 15",
    startDate: "2026-04-15",
    endDate: "2026-04-15",
    location: "Arthur's Pass",
    region: "Alpine crossing",
    coords: [-42.9404, 171.5614],
    nights: 0,
    driveTime: "1.75 hrs from Barrytown",
    type: "waypoint",
    highlight: "One of NZ's greatest road trips",
    details: [
      "From lush bush to alpine peaks to Canterbury Plains",
      "Quick DOC hike in the national park",
      "The landscape changes completely in 2 hours",
    ],
    phase: "arthurs-pass",
  },
  {
    id: "christchurch",
    date: "April 15",
    dateShort: "Apr 15",
    startDate: "2026-04-15",
    endDate: "2026-04-15",
    location: "Christchurch",
    region: "Canterbury",
    coords: [-43.5321, 172.6362],
    nights: 1,
    driveTime: "3.75 hrs total from Barrytown",
    type: "stay",
    highlight: "Garden city, Griffin's dream playground",
    details: [
      "Riverside Market — food hall on the Avon River",
      "Botanic Gardens — huge, free, stroller paradise",
      "Margaret Mahy Playground — possibly the best in NZ",
      "Last night in New Zealand before crossing the ditch",
    ],
    phase: "christchurch",
  },
  {
    id: "melbourne",
    date: "April 16–19",
    dateShort: "Apr 16–19",
    startDate: "2026-04-16",
    endDate: "2026-04-19",
    location: "Melbourne",
    region: "McKinnon, Victoria",
    coords: [-37.8136, 144.9631],
    nights: 3,
    type: "stay",
    highlight: "Family time with Julian's crew",
    details: [
      "Staying with Julian's aunt & uncle Nigel and Lorna",
      "Three days of family, food & exploring Melbourne",
      "Griffin meets the Aussie side of the family",
    ],
    phase: "melbourne",
  },
  {
    id: "home",
    date: "April 20",
    dateShort: "Apr 20",
    startDate: "2026-04-20",
    endDate: "2026-04-20",
    location: "Melbourne → Home",
    region: "The long way back",
    coords: [40.7608, -111.891],
    nights: 0,
    type: "flight",
    highlight: "Back to Salt Lake, full of stories",
    details: [
      "MEL → LAX → SLC",
      "Arriving same day thanks to the date line working in our favor this time",
      "Griffin will sleep the whole way (we hope)",
    ],
    phase: "flight",
  },
];

// Route segments for the map
export interface RouteSegment {
  from: [number, number];
  to: [number, number];
  phase: string;
  color: string;
  dashed?: boolean;
}

export const routeSegments: RouteSegment[] = [
  // Flight: Auckland to Nelson
  { from: [-36.8485, 174.7633], to: [-41.2628, 173.0639], phase: "flight-in", color: "#9CA3AF", dashed: true },
  // Nelson to Takaka
  { from: [-41.2628, 173.0639], to: [-40.8572, 172.8028], phase: "nelson", color: "#3B7A8C", dashed: true },
  // Takaka to Murchison
  { from: [-40.8572, 172.8028], to: [-41.8025, 172.327], phase: "west-coast", color: "#2D4A3E" },
  // Murchison to Reefton
  { from: [-41.8025, 172.327], to: [-42.1167, 171.8628], phase: "west-coast", color: "#2D4A3E" },
  // Reefton to Blackball
  { from: [-42.1167, 171.8628], to: [-42.3361, 171.3539], phase: "west-coast", color: "#2D4A3E" },
  // Blackball to Barrytown
  { from: [-42.3361, 171.3539], to: [-42.345, 171.234], phase: "west-coast", color: "#2D4A3E" },
  // Barrytown to Arthur's Pass
  { from: [-42.345, 171.234], to: [-42.9404, 171.5614], phase: "arthurs-pass", color: "#C4653A" },
  // Arthur's Pass to Christchurch
  { from: [-42.9404, 171.5614], to: [-43.5321, 172.6362], phase: "christchurch", color: "#6B5B8A" },
  // Flight: Christchurch to Melbourne
  { from: [-43.5321, 172.6362], to: [-37.8136, 144.9631], phase: "flight-out", color: "#9CA3AF", dashed: true },
];

// Map each stop id to its index in the route for ordering
export const stopOrder = stops
  .filter((s) => s.phase !== "flight")
  .map((s) => s.id);

// Each route segment connects two stop IDs (for progress tracking)
export const segmentStops: { fromId: string; toId: string }[] = [
  { fromId: "slc-departure", toId: "nelson" },   // AKL→Nelson flight
  { fromId: "nelson", toId: "takaka" },
  { fromId: "takaka", toId: "murchison" },
  { fromId: "murchison", toId: "reefton" },
  { fromId: "reefton", toId: "blackball" },
  { fromId: "blackball", toId: "barrytown" },
  { fromId: "barrytown", toId: "arthurs-pass" },
  { fromId: "arthurs-pass", toId: "christchurch" },
  { fromId: "christchurch", toId: "melbourne" },  // ChCh→Melbourne flight
];

// Get the current stop based on today's date (NZST = UTC+12)
export function getCurrentStop(): Stop | null {
  // Use NZST (UTC+12) to determine the date
  const now = new Date();
  const nzOffset = 12 * 60; // minutes
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nzTime = new Date(utc + nzOffset * 60000);
  const todayStr = nzTime.toISOString().slice(0, 10);

  // Find the stop whose date range includes today
  // Walk backwards through stays to find the latest match
  const stays = stops.filter((s) => s.type === "stay" || s.type === "flight");
  for (let i = stays.length - 1; i >= 0; i--) {
    const s = stays[i];
    if (todayStr >= s.startDate && todayStr <= s.endDate) {
      return s;
    }
  }

  // If between stops (travel day), find the closest upcoming stop
  for (const s of stays) {
    if (todayStr < s.startDate) return s;
  }

  return null;
}

// Determine trip status
export function getTripStatus(): "before" | "during" | "after" {
  const now = new Date();
  const nzOffset = 12 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nzTime = new Date(utc + nzOffset * 60000);
  const todayStr = nzTime.toISOString().slice(0, 10);

  if (todayStr < "2026-04-04") return "before";
  if (todayStr > "2026-04-20") return "after";
  return "during";
}

// Check if a stop has been visited
export function isStopVisited(stop: Stop): boolean {
  const now = new Date();
  const nzOffset = 12 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nzTime = new Date(utc + nzOffset * 60000);
  const todayStr = nzTime.toISOString().slice(0, 10);

  return todayStr > stop.endDate;
}

// Check if a stop is the current one
export function isCurrentStop(stop: Stop): boolean {
  const current = getCurrentStop();
  return current?.id === stop.id;
}

export const phaseColors: Record<string, { color: string; label: string }> = {
  nelson: { color: "#3B7A8C", label: "Nelson & Golden Bay" },
  "golden-bay": { color: "#3B7A8C", label: "Nelson & Golden Bay" },
  "west-coast": { color: "#2D4A3E", label: "West Coast Road Trip" },
  "arthurs-pass": { color: "#C4653A", label: "Arthur's Pass Crossing" },
  christchurch: { color: "#6B5B8A", label: "Christchurch" },
  melbourne: { color: "#8B6F47", label: "Melbourne" },
  flight: { color: "#9CA3AF", label: "Flights" },
};
