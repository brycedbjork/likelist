import React from "react";
import colors from "@/lib/colors";
import styled from "styled-components";
import { spin } from "@/lib/animations";

const Wrapper = styled.div`
  ${spin}
`;

type Props = {
  size?: number;
  color?: string;
  style?: Record<string, unknown>;
};
const Loading: React.FC<Props> = (props) => {
  const width = String(props.size) || "96";
  const height = props.size ? String((props.size * 85) / 96) : "85";

  return (
    <Wrapper style={props.style}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 96 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.02319 9.55143V34.636H28.1078"
          stroke={colors.primary}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M93.0001 74.4437V49.3591H67.9155"
          stroke={colors.primary}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.8852 2.46076C45.3966 0.577324 52.279 0.374059 58.8902 1.86993C65.5015 3.3658 71.626 6.51206 76.6924 11.0151C81.7588 15.5182 85.6019 21.2313 87.8631 27.6213C88.3237 28.923 87.642 30.3515 86.3403 30.8121C85.0387 31.2727 83.6102 30.5909 83.1496 29.2893C81.1701 23.6955 77.8058 18.6943 73.3707 14.7523C68.9356 10.8104 63.5742 8.05614 57.7868 6.74666C51.9994 5.43718 45.9745 5.61512 40.2745 7.26387C34.5744 8.91262 29.3849 11.9784 25.1902 16.1753C25.1717 16.1938 25.1529 16.2119 25.1339 16.2298L5.73514 34.458C4.72894 35.4035 3.1468 35.3542 2.20132 34.348C1.25584 33.3418 1.30506 31.7597 2.31126 30.8142L21.6819 12.6125C26.4688 7.8327 32.3865 4.34051 38.8852 2.46076ZM94.822 50.6472C95.7674 51.6534 95.7182 53.2356 94.712 54.181L75.3413 72.3828C70.5545 77.1626 64.6368 80.6548 58.1381 82.5345C51.6267 84.4179 44.7443 84.6212 38.133 83.1253C31.5218 81.6294 25.3973 78.4832 20.3309 73.9801C15.2645 69.4771 11.4214 63.764 9.16013 57.3739C8.69953 56.0723 9.38131 54.6437 10.6829 54.1831C11.9846 53.7225 13.4131 54.4043 13.8737 55.7059C15.8532 61.2998 19.2174 66.301 23.6525 70.2429C28.0876 74.1849 33.449 76.9391 39.2365 78.2486C45.0239 79.5581 51.0487 79.3801 56.7488 77.7314C62.4489 76.0826 67.6384 73.0168 71.8331 68.82C71.8516 68.8015 71.8703 68.7833 71.8894 68.7654L91.2881 50.5373C92.2943 49.5918 93.8765 49.641 94.822 50.6472Z"
          fill={colors.primary}
        />
      </svg>
    </Wrapper>
  );
};
Loading.defaultProps = {
  style: {},
  color: colors.white,
};

export default Loading;
