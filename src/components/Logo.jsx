import React from 'react';

/**
 * Brand logo — compact lockup for the two careers:
 *   • boxing-glove emblem  → the fighter
 *   • "SAADAOUI.IT" wordmark, ".IT" in teal → the developer (and the domain)
 * Inline SVG glove keeps it crisp and self-contained (no icon fetch).
 */
export default function Logo() {
  return (
    <span className="brand-logo">
      <span className="brand-emblem" aria-hidden="true">
        {/*
          The glove is filled with currentColor, not white: on the light theme a
          white glove is a white shape on a near-white header, which is no logo
          at all. The colour now comes from .brand-emblem and follows the theme.
        */}
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          {/* boxing glove */}
          <path d="M12 20 V12 a8 8 0 0 1 16 0 V20 Z" />
          <ellipse cx="10.5" cy="15" rx="4.6" ry="4.2" />
          <rect x="12" y="18.5" width="16" height="8.5" rx="2.6" />
          {/* thumb / finger groove */}
          <path
            d="M15.5 12.2 a4.5 4.5 0 0 1 4.5 -4"
            fill="none"
            stroke="#12a594"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* cuff strap */}
          <rect x="12" y="21.5" width="16" height="1.8" fill="#0f8f80" opacity="0.55" />
        </svg>
      </span>
      <span className="brand-word">
        SAADAOUI<span className="brand-it">.IT</span>
      </span>
    </span>
  );
}
