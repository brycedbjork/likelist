import { fadeIn } from "@/lib/animations";
import colors from "@/lib/colors";
import { rgba } from "polished";
import styled from "styled-components";

const Subtitle = styled.h2`
  font-size: 28px;
  color: ${rgba(colors.white, 0.8)};
  font-weight: 500;
  margin: 5px 0;
  text-align: center;
  ${fadeIn}
`;

export default Subtitle;
