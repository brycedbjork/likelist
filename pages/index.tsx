import { MOBILE_BREAKPOINT } from "@/lib/constants";
import colors from "@/lib/colors";
import App from "@/components/App";
import startAuth from "@/db/startAuth";
import type { NextPage } from "next";
import styled from "styled-components";
import Image from "next/image";
import Logo from "@/components/universal/Logo";
import { rgba } from "polished";
import Loading from "@/components/universal/Loading";
import Check from "@/components/universal/Check";
import Head from "next/head";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 15px 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 21px;
  font-weight: 500;
  display: flex;
  justify-content: row;
  align-items: center;
  transition: all 100ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
`;

const ButtonText = styled.span`
  margin-right: 10px;
`;

const Hero = styled.h1`
  font-size: 89px;
  color: ${colors.white};
  font-weight: 800;
  margin-bottom: 20px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 50px;
    text-align: center;
  }
`;

const LikesGraphic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  margin-top: 30px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-left: 0;
  }
`;

const SpotifyLikes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: auto;
  }
`;

const SpotifyLikesText = styled.span`
  font-size: 28px;
  color: ${colors.white};
  font-weight: 600;
  margin-left: 10px;
  flex: 1;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    flex: none;
  }
`;

const LikeListCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${rgba(colors.white, 0.1)};
  border-radius: 10px;
  padding: 20px;
  align-self: flex-start;
`;

const LikeListLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28px;
  color: ${colors.white};
  font-weight: 600;
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 5px;
`;

const BenefitText = styled.p`
  font-size: 21px;
  color: ${rgba(colors.white, 0.8)};
  font-weight: 400;
  margin-left: 10px;
`;

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>likelist.xyz – Share your liked songs</title>
        <meta
          name="description"
          content={
            "The easiest way to share your liked songs: create a synced Spotify playlist and get a personal music link!"
          }
        />
        <meta name="url" content={`https://likelist.xyz`} />
        <meta name="og:title" content={"likelist.xyz"} />
        <meta
          name="og:description"
          content={
            "The easiest way to share your liked songs: create a synced Spotify playlist and get a personal music link!"
          }
        />
        <meta
          name="og:url"
          content={"https://likelist.xyz - Share your liked songs"}
        />
      </Head>
      <App>
        <Wrapper>
          <Section>
            <Hero>
              Share your
              <br />
              liked songs
            </Hero>
            <Button onClick={startAuth}>
              <ButtonText>Continue with</ButtonText>
              <Image
                src="/assets/spotify.png"
                layout="fixed"
                height={30}
                width={100}
                objectFit="contain"
              />
            </Button>
          </Section>
          <Section>
            <LikesGraphic>
              <SpotifyLikes>
                <Image
                  src={"/assets/liked-songs.png"}
                  layout="fixed"
                  height={40}
                  width={40}
                />
                <SpotifyLikesText>Liked Songs</SpotifyLikesText>
              </SpotifyLikes>
              <Loading
                color={colors.primary}
                size={60}
                style={{ marginTop: 15, marginBottom: 20 }}
              />
              <LikeListCard>
                <LikeListLink>
                  <Logo size={20} style={{ marginRight: 10 }} />{" "}
                  bryce.likelist.xyz
                </LikeListLink>
                <Benefit>
                  <Check size={16} color={rgba(colors.white, 0.8)} />
                  <BenefitText>synced Spotify playlist</BenefitText>
                </Benefit>
                <Benefit>
                  <Check size={16} color={rgba(colors.white, 0.8)} />
                  <BenefitText>personal music link</BenefitText>
                </Benefit>
              </LikeListCard>
            </LikesGraphic>
          </Section>
        </Wrapper>
      </App>
    </>
  );
};

export default HomePage;
