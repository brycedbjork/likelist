import React from "react";
import colors from "@/lib/colors";

type Props = {
  size?: number;
  color?: string;
  style?: Record<string, unknown>;
};
const Cross: React.FC<Props> = (props) => {
  const size = String(props.size) || "22";

  return (
    <span style={props.style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={props.color || colors.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
};

export default Cross;
