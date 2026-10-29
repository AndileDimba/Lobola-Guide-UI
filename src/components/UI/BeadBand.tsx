import React, { useId } from "react";

interface BeadBandProps {
  colors?: string[]; // theme.beads: ground colour first, then the beads
}

/**
 * A thin band of beadwork triangles. Used sparingly, as a frame at the top and
 * bottom of a guide, never as decoration inside the reading column.
 */
const BeadBand: React.FC<BeadBandProps> = ({ colors }) => {
  // useId can contain characters that break a url(#...) reference
  const patternId = `beads-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  if (!colors || colors.length < 2) return null;

  const [ground, ...beads] = colors;
  const width = beads.length * 16;

  return (
    <svg width="100%" height="10" aria-hidden="true" className="block">
      <defs>
        <pattern
          id={patternId}
          width={width}
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width={width} height="10" fill={ground} />
          {beads.map((color, i) => (
            <polygon
              key={i}
              points={`${i * 16},10 ${i * 16 + 8},0 ${i * 16 + 16},10`}
              fill={color}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="10" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default BeadBand;
