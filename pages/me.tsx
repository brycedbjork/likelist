import App from "@/components/App";
import Subtitle from "@/components/universal/Subtitle";
import Title from "@/components/universal/Title";
import getUser from "@/db/getUser";
import colors from "@/lib/colors";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Copy from "@/components/universal/Copy";
import Fireworks from "@/components/universal/Fireworks";
import { fadeIn } from "@/lib/animations";
import { MOBILE_BREAKPOINT } from "@/lib/constants";
import { rgba } from "polished";
import { useCallback, useState } from "react";
import Head from "next/head";

const Live = styled.span`
  color: ${colors.black};
  background-color: ${colors.secondary};
  padding: 5px 8px;
  border-radius: 10px;
  margin-left: 5px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled.a`
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
  margin: 10px 15px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const ButtonText = styled.span`
  margin-left: 10px;
`;

const SecondaryButton = styled.a`
  background-color: ${rgba(colors.white, 0.1)};
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
  margin: 10px 15px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const TitleLink = styled.h1`
  font-size: 89px;
  color: ${colors.white};
  font-weight: 900;
  margin: 10px 0;
  text-align: center;
  transition: all 100ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  &:hover {
    color: ${colors.secondary};
    cursor: pointer;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: 28px;
    text-align: center;
  }
  ${fadeIn}
`;

const MePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const userQuery = useQuery(["user", uid], getUser(uid));

  const [copied, setCopied] = useState(false);
  const copyLink = useCallback(() => {
    window.navigator.clipboard.writeText(`${userQuery.data.slug}.likelist.xyz`);
    setCopied(true);
  }, [userQuery]);

  return (
    <>
      <Head>
        {userQuery.isLoading && <title>likelist.xyz - LIVE</title>}
        {userQuery.data && (
          <title>{userQuery.data.slug}.likelist.xyz - LIVE</title>
        )}
        <meta name="robots" content="noindex" />
      </Head>
      <App>
        {!userQuery.isLoading && userQuery.data && (
          <>
            <Fireworks />
            <Subtitle>
              Your likelist is <Live>LIVE</Live>
            </Subtitle>
            <Link href={`https://${userQuery.data.slug}.likelist.xyz`}>
              <TitleLink>{userQuery.data.slug}.likelist.xyz</TitleLink>
            </Link>
            <Buttons>
              <SecondaryButton onClick={copyLink}>
                <Copy size={30} style={{ transform: "translateY(3px)" }} />
                <ButtonText>{copied ? "Copied!" : "Copy Link"}</ButtonText>
              </SecondaryButton>
              <Button
                href={"https://instagram.com/accounts/edit"}
                target="_blank"
              >
                <Image
                  src="/assets/insta.png"
                  layout="fixed"
                  height={30}
                  width={30}
                  objectFit="contain"
                />
                <ButtonText>Add to Bio</ButtonText>
              </Button>
            </Buttons>
          </>
        )}
      </App>
    </>
  );
};

export default MePage;
