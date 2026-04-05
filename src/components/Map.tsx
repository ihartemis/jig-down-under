"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  stops,
  routeSegments,
  segmentStops,
  getCurrentStop,
  getTripStatus,
  isStopVisited,
  isCurrentStop,
  type Stop,
} from "@/lib/itinerary";

const pulseCSS = `
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes pulse-dot {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.pulse-marker { position: relative; }
.pulse-marker .ring {
  position: absolute; inset: -8px; border-radius: 50%;
  border: 3px solid #C4653A;
  animation: pulse-ring 2s ease-out infinite;
}
.pulse-marker .dot {
  width: 22px; height: 22px; border-radius: 50%;
  background: #C4653A; border: 3px solid #F5F0E8;
  box-shadow: 0 2px 8px rgba(196,101,58,0.5);
  animation: pulse-dot 2s ease-in-out infinite;
}
/* Watercolor / parchment map styling */
.illustrated-map .leaflet-tile-pane {
  filter: saturate(0.25) sepia(0.35) brightness(1.08) contrast(0.85);
}
.illustrated-map .leaflet-tile-pane::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(237, 231, 219, 0.15);
  pointer-events: none;
  z-index: 1;
}
.map-label {
  font-family: 'DM Serif Display', Georgia, serif;
  font-weight: 400;
  white-space: nowrap;
  text-shadow:
    0 0 6px rgba(245,240,232,0.95),
    1px 1px 0 rgba(245,240,232,0.9),
    -1px -1px 0 rgba(245,240,232,0.9),
    1px -1px 0 rgba(245,240,232,0.9),
    -1px 1px 0 rgba(245,240,232,0.9),
    0 0 12px rgba(245,240,232,0.7);
}
.map-label-current {
  font-family: 'DM Serif Display', Georgia, serif;
  font-weight: 400;
  white-space: nowrap;
  color: #C4653A;
  font-size: 14px;
  text-shadow:
    0 0 8px rgba(245,240,232,1),
    1px 1px 0 rgba(245,240,232,1),
    -1px -1px 0 rgba(245,240,232,1),
    1px -1px 0 rgba(245,240,232,1),
    -1px 1px 0 rgba(245,240,232,1),
    0 0 16px rgba(245,240,232,0.8);
}
.map-label-flight {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 12px; font-style: italic; color: #8B7355;
  white-space: nowrap;
  text-shadow:
    0 0 6px rgba(245,240,232,0.95),
    1px 1px 0 rgba(245,240,232,0.9),
    -1px -1px 0 rgba(245,240,232,0.9);
}
`;

function getPhaseColor(stop: Stop): string {
  if (stop.phase === "nelson" || stop.phase === "golden-bay") return "#3B7A8C";
  if (stop.phase === "west-coast") return "#2D4A3E";
  if (stop.phase === "arthurs-pass") return "#C4653A";
  if (stop.phase === "christchurch") return "#6B5B8A";
  if (stop.phase === "melbourne") return "#8B6F47";
  return "#8B7355";
}

// Bold, saturated route colors for the illustrated style
function getRouteColor(phase: string): string {
  if (phase === "nelson") return "#1A6B7F";
  if (phase === "west-coast") return "#1B3D30";
  if (phase === "arthurs-pass") return "#B84E25";
  if (phase === "christchurch") return "#5A4580";
  if (phase === "flight-in" || phase === "flight-out") return "#8B7355";
  return "#6B5B4A";
}

const AUCKLAND: [number, number] = [-36.8485, 174.7633];
const MELBOURNE: [number, number] = [-37.8136, 144.9631];

export default function TripMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [currentStop, setCurrentStop] = useState<Stop | null>(null);
  const [tripStatus, setTripStatus] = useState<"before" | "during" | "after">("before");

  useEffect(() => {
    setCurrentStop(getCurrentStop());
    setTripStatus(getTripStatus());
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    }).setView([-41.0, 172.0], 7);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const style = document.createElement("style");
    style.textContent = pulseCSS;
    document.head.appendChild(style);

    // Add illustrated class
    mapRef.current.classList.add("illustrated-map");

    // Stamen Watercolor tiles — painterly, illustrated feel
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
      { maxZoom: 16, attribution: "Stamen / Stadia Maps" }
    ).addTo(map);

    // Add a labels-only layer on top for place names
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}.png",
      { maxZoom: 16, opacity: 0.45 }
    ).addTo(map);

    const status = getTripStatus();

    // ── Draw ALL route segments — bold, always solid ──
    routeSegments.forEach((seg, i) => {
      const segInfo = segmentStops[i];
      if (!segInfo) return;

      const fromStop = stops.find((s) => s.id === segInfo.fromId);
      const toStop = stops.find((s) => s.id === segInfo.toId);
      if (!fromStop || !toStop) return;

      const isFlightSeg = seg.phase === "flight-in" || seg.phase === "flight-out";
      const color = getRouteColor(seg.phase);

      const visited = isStopVisited(fromStop) && (isStopVisited(toStop) || isCurrentStop(toStop));

      // Draw dark border line underneath for contrast
      L.polyline([seg.from, seg.to], {
        color: "#2A2A28",
        weight: isFlightSeg ? 4 : 7,
        opacity: 0.15,
        lineCap: "round",
        lineJoin: "round",
        dashArray: isFlightSeg ? "12, 10" : undefined,
      }).addTo(map);

      // Main route line — always solid and visible
      L.polyline([seg.from, seg.to], {
        color,
        weight: isFlightSeg ? 3 : 5,
        opacity: status === "during" && !visited && !isCurrentStop(fromStop) ? 0.5 : 0.9,
        lineCap: "round",
        lineJoin: "round",
        dashArray: isFlightSeg ? "10, 8" : undefined,
      }).addTo(map);
    });

    // ── Flight waypoints: Auckland & Melbourne ──
    const aklIcon = L.divIcon({
      className: "",
      html: `<div style="width:12px;height:12px;border-radius:50%;background:#8B7355;border:2.5px solid #F5F0E8;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
    const aklMarker = L.marker(AUCKLAND, { icon: aklIcon }).addTo(map);
    aklMarker.bindPopup(
      `<div style="font-family: 'DM Serif Display', Georgia, serif; font-size: 13px;">
        <strong>Auckland</strong><br/>
        <span style="color:#666;font-size:12px;">Apr 6 — Transit stop</span>
        <p style="margin:4px 0 0;color:#444;">Land at 6:50am, connect to Nelson at 9:45am</p>
      </div>`,
      { maxWidth: 220, closeButton: false }
    );
    L.marker(AUCKLAND, {
      icon: L.divIcon({
        className: "map-label-flight",
        html: "Auckland  ✈",
        iconAnchor: [-8, 6],
      }),
      interactive: false,
    }).addTo(map);

    const melIcon = L.divIcon({
      className: "",
      html: `<div style="width:14px;height:14px;border-radius:50%;background:#8B6F47;border:2.5px solid #F5F0E8;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    const melMarker = L.marker(MELBOURNE, { icon: melIcon }).addTo(map);
    melMarker.bindPopup(
      `<div style="font-family: 'DM Serif Display', Georgia, serif; font-size: 13px;">
        <strong>Melbourne</strong><br/>
        <span style="color:#666;font-size:12px;">Apr 16–19 — 3 nights</span>
        <p style="margin:4px 0 0;color:#444;">Family time with Julian's aunt & uncle Nigel and Lorna</p>
      </div>`,
      { maxWidth: 220, closeButton: false }
    );
    L.marker(MELBOURNE, {
      icon: L.divIcon({
        className: "map-label-flight",
        html: "Melbourne",
        iconAnchor: [-10, 6],
      }),
      interactive: false,
    }).addTo(map);

    // ── NZ road trip stops ──
    const nzStops = stops.filter(
      (s) =>
        s.phase !== "flight" &&
        s.phase !== "melbourne" &&
        s.id !== "home" &&
        s.id !== "slc-departure"
    );

    nzStops.forEach((stop) => {
      const isWaypoint = stop.type === "waypoint";
      const phaseColor = getPhaseColor(stop);
      const visited = isStopVisited(stop);
      const isCurrent = isCurrentStop(stop);

      if (isCurrent && status === "during") {
        // Pulsing current location marker
        const icon = L.divIcon({
          className: "",
          html: `<div class="pulse-marker"><div class="ring"></div><div class="dot"></div></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        const marker = L.marker(stop.coords, { icon, zIndexOffset: 1000 }).addTo(map);
        marker.bindPopup(
          `<div style="font-family: 'DM Serif Display', Georgia, serif; font-size: 13px; line-height: 1.5;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#C4653A;"></span>
              <strong style="font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#C4653A;">We're here now!</strong>
            </div>
            <strong style="font-size: 16px;">${stop.location}</strong><br/>
            <span style="color: #666; font-size: 12px;">${stop.date}</span>
            <p style="margin: 6px 0 0; color: #444;">${stop.highlight}</p>
          </div>`,
          { maxWidth: 230, closeButton: false }
        );
        L.marker(stop.coords, {
          icon: L.divIcon({
            className: "map-label-current",
            html: stop.location,
            iconAnchor: [-16, 6],
          }),
          interactive: false,
          zIndexOffset: 999,
        }).addTo(map);
      } else {
        // Standard marker — bigger, bolder for illustrated style
        const size = isWaypoint ? 12 : 18;
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            width:${size}px; height:${size}px; border-radius:50%;
            background:${phaseColor};
            border: 3px solid #F5F0E8;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1);
            ${visited && status === 'during' ? 'opacity:0.55;' : ''}
          "></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
        const marker = L.marker(stop.coords, { icon }).addTo(map);
        marker.bindPopup(
          `<div style="font-family: 'DM Serif Display', Georgia, serif; font-size: 13px; line-height: 1.5;">
            <strong style="font-size: 15px;">${stop.location}</strong><br/>
            <span style="color: #666; font-size: 12px;">${stop.date}</span>
            <p style="margin: 6px 0 0; color: #444;">${stop.highlight}</p>
          </div>`,
          { maxWidth: 220, closeButton: false }
        );

        // Labels for main stops
        if (!isWaypoint) {
          const labelColor = visited && status === "during" ? "#8B7355" : "#3D2E1C";
          L.marker(stop.coords, {
            icon: L.divIcon({
              className: "map-label",
              html: `<span style="font-size:13px;color:${labelColor};">${stop.location}</span>`,
              iconAnchor: [-12, 6],
            }),
            interactive: false,
          }).addTo(map);
        }
      }
    });

    // Fit to NZ stops only
    const bounds = L.latLngBounds(nzStops.map((s) => s.coords));
    map.fitBounds(bounds, { padding: [40, 40] });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
      style.remove();
    };
  }, []);

  // Status banner
  const isInFlight = currentStop?.phase === "flight";
  const statusLabel = tripStatus === "before"
    ? "Trip starts soon!"
    : tripStatus === "after"
    ? "Trip complete!"
    : isInFlight
    ? "In the air!"
    : currentStop
    ? `Currently in ${currentStop.location}`
    : "On the road";

  const statusSubtext = isInFlight && currentStop
    ? currentStop.location
    : null;

  return (
    <div className="relative w-full h-full">
      {/* Status banner */}
      <div className="absolute top-3 left-3 z-[1000] bg-cream/90 backdrop-blur-md rounded-lg shadow-md px-4 py-2.5 flex items-center gap-2.5 border border-stone-300/30">
        {tripStatus === "during" && !isInFlight && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sienna opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sienna"></span>
          </span>
        )}
        {isInFlight && (
          <span className="text-base animate-bounce">✈️</span>
        )}
        {tripStatus === "before" && (
          <span className="text-base">🧳</span>
        )}
        {tripStatus === "after" && (
          <span className="text-base">✅</span>
        )}
        <div>
          <span className="text-sm font-semibold text-charcoal block font-display">{statusLabel}</span>
          {statusSubtext && (
            <span className="text-xs text-stone-400">{statusSubtext}</span>
          )}
        </div>
      </div>

      <div
        ref={mapRef}
        className="w-full h-full rounded-2xl"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
}
