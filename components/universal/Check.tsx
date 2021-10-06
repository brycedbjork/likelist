import React from "react";
import colors from "@/lib/colors";

type Props = {
  size?: number;
  color?: string;
  style?: Record<string, unknown>;
};
const Check: React.FC<Props> = (props) => {
  const size = String(props.size) || "15";

  return (
    <span style={props.style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7.12903L4.66667 11L12 1"
          stroke={props.color}
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
Check.defaultProps = {
  style: {},
  color: colors.white,
};

export default Check;
