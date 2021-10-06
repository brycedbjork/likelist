import React, { useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import colors from "@/lib/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  align-self: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

type Props = {};
const Fireworks: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <Wrapper>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: require("@/lib/fireworks.json"),
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
    </Wrapper>
  );
};
Fireworks.defaultProps = {
  style: {},
};

export default Fireworks;
