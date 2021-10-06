import colors from "@/lib/colors";
import { rgba } from "polished";
import React from "react";
import styled from "styled-components";
import Loading from "./universal/Loading";
import Logo from "./universal/Logo";
import Subtitle from "./universal/Subtitle";
import Title from "./universal/Title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  position: relative;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  title: string;
  subtitle?: string;
};

const RobotsWorking: React.FC<Props> = (props) => {
  const { subtitle, title } = props;
  return (
    <Wrapper>
      <Subtitle>{subtitle || "🤖 Robots are hard at work"}</Subtitle>
      <Title>{title}</Title>
      <LoadingWrapper>
        <Loading size={160} />
        <Logo size={40} style={{ position: "absolute" }} />
      </LoadingWrapper>
    </Wrapper>
  );
};

export default RobotsWorking;
