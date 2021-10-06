import React from "react";
import colors from "@/lib/colors";

type Props = {
  size?: number;
  color?: string;
  style?: Record<string, unknown>;
};
const Copy: React.FC<Props> = (props) => {
  return (
    <div style={props.style}>
      <svg
        width={String(props.size)}
        height={String(props.size)}
        viewBox={`0 0 23 23`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.144 8.69073H10.144C9.03947 8.69073 8.14404 9.58617 8.14404 10.6907V19.6907C8.14404 20.7953 9.03947 21.6907 10.144 21.6907H19.144C20.2486 21.6907 21.144 20.7953 21.144 19.6907V10.6907C21.144 9.58617 20.2486 8.69073 19.144 8.69073Z"
          stroke={props.color || colors.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.14404 14.6907H3.14404C2.61361 14.6907 2.1049 14.48 1.72983 14.1049C1.35476 13.7299 1.14404 13.2212 1.14404 12.6907V3.69073C1.14404 3.1603 1.35476 2.65159 1.72983 2.27652C2.1049 1.90145 2.61361 1.69073 3.14404 1.69073H12.144C12.6745 1.69073 13.1832 1.90145 13.5583 2.27652C13.9333 2.65159 14.144 3.1603 14.144 3.69073V4.69073"
          stroke={props.color || colors.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
Copy.defaultProps = {
  style: {},
};

export default Copy;
