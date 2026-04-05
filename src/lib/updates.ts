export interface Update {
  id: string;
  date: string;
  location: string;
  text: string;
  photo?: string;
}

// Add new updates to the TOP of this array.
// Push to GitHub and Vercel will auto-deploy in ~30 seconds.
//
// For photos: drop images in public/photos/ and reference as "/photos/filename.jpg"
//
export const updates: Update[] = [
  {
    id: "auckland-transit",
    date: "April 6, 2026",
    location: "Auckland Airport",
    text: "We made it across the Pacific! The flight was actually... fine? Griffin slept for half of it and spent the other half flirting with a French girl across the aisle. Then NZ biosecurity pulled us aside because our stroller was absolutely caked in tree matter and seed pods from Utah. Welcome to New Zealand, here's your agriculture inspection. Waiting for our connecting flight to Nelson now — the adventure officially begins.",
  },
  {
    id: "pre-trip",
    date: "April 4, 2026",
    location: "Salt Lake City",
    text: "Bags packed, passports found (after a brief panic), and Griffin has no idea what's about to hit him. See you on the other side of the planet.",
  },
];
