// GearIcon.jsx
// Cyberpunk animated gear icon for settings/options
import React from 'react';

const GearIcon = ({ size = 32, color = '#00fff7', style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: 'drop-shadow(0 0 8px #ff00c8) drop-shadow(0 0 4px #00fff7)',
      animation: 'gearSpin 2s linear infinite',
      ...style
    }}
  >
    <g>
      <circle cx="16" cy="16" r="7" stroke={color} strokeWidth="2" fill="#232526" />
      <g stroke={color} strokeWidth="2">
        <path d="M16 2v4" />
        <path d="M16 28v2" />
        <path d="M2 16h4" />
        <path d="M28 16h2" />
        <path d="M6.22 6.22l2.83 2.83" />
        <path d="M24.95 24.95l2.83 2.83" />
        <path d="M6.22 25.78l2.83-2.83" />
        <path d="M24.95 7.05l2.83-2.83" />
      </g>
    </g>
    <style>{`
      @keyframes gearSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);

export default GearIcon;
