import React from "react";
import styled from "styled-components";
import Image from "next/image";
import colors from "@/lib/colors";
import Link from "next/link";
import Logo from "@/components/universal/Logo";
import { MOBILE_BREAKPOINT } from "@/lib/constants";

const SafeHydrate = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const TopBar = styled.div`
  width: 100vw;
  padding: 20px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 21px;
  color: ${colors.white};
  margin-left: 15px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 60px;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Brand = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const App: React.FC = (props) => {
  return (
    <SafeHydrate>
      <TopBar>
        <Link href="/" passHref>
          <Brand>
            <Logo size={30} />
            <Title>likelist.xyz</Title>
          </Brand>
        </Link>
      </TopBar>
      <Content>{props.children}</Content>
    </SafeHydrate>
  );
};

export default App;
