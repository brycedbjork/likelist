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
import Fireworks from "@/components/universal/Fireworks";

const Live = styled.span`
  color: ${colors.black};
  background-color: ${colors.secondary};
  padding: 5px 8px;
  border-radius: 10px;
  margin-left: 5px;
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
  margin-top: 10px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const ButtonText = styled.span`
  margin-left: 10px;
`;

const MePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const userQuery = useQuery(["user", uid], getUser(uid));

  return (
    <App>
      {!userQuery.isLoading && userQuery.data && (
        <>
          <Fireworks />
          <Subtitle>
            Your likelist is <Live>LIVE</Live>
          </Subtitle>
          <Title>{userQuery.data.slug}.likelist.xyz</Title>
          <Button href={"https://instagram.com"}>
            <Image
              src="/assets/insta.png"
              layout="fixed"
              height={30}
              width={30}
              objectFit="contain"
            />
            <ButtonText>Add to Bio</ButtonText>
          </Button>
        </>
      )}
    </App>
  );
};

export default MePage;
