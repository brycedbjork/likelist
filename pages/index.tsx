import colors from "@/colors";
import startAuth from "@/db/startAuth";
import type { NextPage } from "next";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
`;

const HomePage: NextPage = () => {
  return <Button onClick={startAuth}>Continue with Spotify</Button>;
};

export default HomePage;
