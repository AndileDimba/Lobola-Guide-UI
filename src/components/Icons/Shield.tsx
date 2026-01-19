import React from "react";

interface ShieldProps {
  color?: string;
  className?: string;
}

export const Shield: React.FC<ShieldProps> = ({
  color = "currentColor",
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C12 2 4 5 4 12C4 19 12 22 12 22C12 22 20 19 20 12C20 5 12 2 12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7 8H17" stroke={color} strokeWidth="1" strokeLinecap="round" />
    <path d="M7 12H17" stroke={color} strokeWidth="1" strokeLinecap="round" />
    <path d="M7 16H17" stroke={color} strokeWidth="1" strokeLinecap="round" />
  </svg>
);
