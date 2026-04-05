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
    id: "pre-trip",
    date: "April 4, 2026",
    location: "Salt Lake City",
    text: "Bags packed, passports found (after a brief panic), and Griffin has no idea what's about to hit him. See you on the other side of the planet.",
  },
];
