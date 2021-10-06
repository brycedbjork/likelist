import { fadeIn } from "@/lib/animations";
import colors from "@/lib/colors";
import { MOBILE_BREAKPOINT } from "@/lib/constants";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 89px;
  color: ${colors.white};
  font-weight: 900;
  margin: 10px 0;
  text-align: center;
  ${fadeIn}
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 50px;
  }
`;

export default Title;
