import React from 'react';

/**
 * Brand logo — inline SVG so it stays razor-sharp at any size and uses the
 * site font (Space Grotesk). Designed for a dark header: light wordmark with
 * a teal monogram badge.
 */
export default function Logo() {
  return (
    <svg
      className="brand-logo"
      viewBox="0 0 452 96"
      role="img"
      aria-label="Saadaoui"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="asBadge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34e3cf" />
          <stop offset="1" stopColor="#12a594" />
        </linearGradient>
      </defs>

      {/* Monogram badge */}
      <rect x="4" y="8" width="80" height="80" rx="20" fill="url(#asBadge)" />
      <rect
        x="4"
        y="8"
        width="80"
        height="80"
        rx="20"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      {/* Stylized "AS" monogram */}
      <text
        x="44"
        y="61"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="42"
        fontWeight="700"
        letterSpacing="-2"
        fill="#ffffff"
      >
        AS
      </text>

      {/* Wordmark */}
      <text
        x="104"
        y="52"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="42"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#e9eef5"
      >
        SAADAOUI
      </text>

      {/* Tagline */}
      <text
        x="106"
        y="78"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="12.5"
        fontWeight="500"
        letterSpacing="6.5"
        fill="#2dd4bf"
      >
        FULL-STACK ENGINEER
      </text>
    </svg>
  );
}
