import { fadeIn } from "@/lib/animations";
import colors from "@/lib/colors";
import { rgba } from "polished";
import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "@/lib/constants";

const Subtitle = styled.h2`
  font-size: 28px;
  color: ${rgba(colors.white, 0.8)};
  font-weight: 500;
  margin: 5px 0;
  text-align: center;
  ${fadeIn}
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 21px;
  }
`;

export default Subtitle;
