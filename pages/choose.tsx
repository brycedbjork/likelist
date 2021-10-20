import App from "@/components/App";
import Check from "@/components/universal/Check";
import Cross from "@/components/universal/Cross";
import Logo from "@/components/universal/Logo";
import Subtitle from "@/components/universal/Subtitle";
import Title from "@/components/universal/Title";
import chooseSlug from "@/db/chooseSlug";
import getUser from "@/db/getUser";
import testSlug from "@/db/testSlug";
import colors from "@/lib/colors";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { rgba } from "polished";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Head from "next/head";
import slugify from "@/lib/slugify";

const InputWrapper = styled.div`
  border-radius: 10px;
  background-color: ${rgba(colors.white, 0.1)};
  color: ${colors.white};
  padding: 20px 30px;
  margin: 20px 0;
  font-size: 21px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Input = styled.input`
  color: ${colors.secondary};
  font-size: 21px;
  font-weight: 600;
  background: none;
  border: none;
  outline: none;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? rgba(colors.white, 0.1) : colors.primary};
  color: ${(props) =>
    props.disabled ? rgba(colors.white, 0.5) : colors.white};
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
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const ChoosePage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const [available, setAvailable] = useState(true);

  const userQuery = useQuery(["user", uid], getUser(uid));

  const chooseSlugMutation = useMutation(chooseSlug, {
    onSuccess: () => {
      router.push(`/sync?uid=${uid}`);
    },
  });

  const inputRef = useRef<HTMLInputElement>();

  const submit = useCallback(() => {
    chooseSlugMutation.mutate({ uid, slug: inputRef.current.value });
  }, [uid, inputRef]);

  const resizeInput = useCallback(() => {
    if (inputRef.current)
      inputRef.current.style.width = inputRef.current.value.length + "ch";
  }, [inputRef]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("input", resizeInput);
    }
    return () => inputRef.current?.removeEventListener("input", resizeInput);
  }, [userQuery.data, inputRef.current]);

  useEffect(() => {
    if (userQuery.data?.name) {
      const suggestedSlug = slugify(userQuery.data.name);
      inputRef.current.value = suggestedSlug;
      resizeInput();
      testSlug(suggestedSlug).then((available) => {
        setAvailable(available);
      });
    }
  }, [userQuery.data]);

  return (
    <>
      <Head>
        <title>likelist.xyz - Choose your music link</title>
        <meta name="robots" content="noindex" />
      </Head>
      <App>
        {!userQuery.isLoading && userQuery.data && (
          <>
            <Subtitle>👋 Hi {userQuery.data.name}</Subtitle>
            <Title>
              Choose your
              <br />
              music link
            </Title>
            <InputWrapper>
              <Input
                autoFocus={true}
                ref={inputRef}
                onChange={async (e) => {
                  const slug = e.target.value;
                  const available = await testSlug(slug);
                  setAvailable(available);
                }}
              />
              .likelist.xyz
              {available && (
                <Check
                  size={21}
                  style={{ marginLeft: 20, marginTop: 8, marginBottom: 4 }}
                  color={colors.secondary}
                />
              )}
              {!available && (
                <Cross
                  size={28}
                  style={{ marginLeft: 20, left: 5, marginTop: 5 }}
                  color={colors.red}
                />
              )}
            </InputWrapper>
            <Button disabled={!available} onClick={submit}>
              Start Syncing{" "}
              <Logo
                color={available ? colors.white : rgba(colors.white, 0.5)}
                size={30}
                style={{ marginLeft: 20 }}
              />
            </Button>
          </>
        )}
      </App>
    </>
  );
};

export default ChoosePage;
