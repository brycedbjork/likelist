import React from "react";
import colors from "@/lib/colors";

type Props = {
  size?: number;
  color?: string;
  style?: Record<string, unknown>;
};
const Logo: React.FC<Props> = (props) => {
  const size = String(props.size) || "30";

  return (
    <span style={props.style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 239 239"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M235.808 1.85631C233.81 0.234375 231.181 -0.329034 228.621 0.183156L74.9777 34.3291C71.0684 35.1998 68.2857 38.6657 68.2857 42.6607V177.708C61.1328 173.371 52.3239 170.708 42.6786 170.708C19.1541 170.708 0 186.023 0 204.854C0 223.686 19.1541 239 42.6786 239C66.203 239 85.3571 223.686 85.3571 204.854V100.726L221.929 70.3702V143.562C214.776 139.226 205.967 136.562 196.321 136.562C172.78 136.562 153.643 151.877 153.643 170.708C153.643 189.54 172.78 204.854 196.321 204.854C219.863 204.854 239 189.54 239 170.708V8.51477C239 5.91968 237.839 3.47824 235.808 1.85631V1.85631Z"
          fill={props.color}
        />
      </svg>
    </span>
  );
};
Logo.defaultProps = {
  style: {},
  color: colors.white,
};

export default Logo;
