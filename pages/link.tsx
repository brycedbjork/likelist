import colors from "@/colors";
import startAuth from "@/db/startAuth";
import verifyAuth from "@/db/verifyAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

const LinkPage: NextPage = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const state = router.query.state as string;

  const verifyAuthMutation = useMutation(verifyAuth, {
    onSuccess: (user) => {
      if (user && user.slug) router.push(`/me`);
      else router.push(`/choose?uid=${user.id}`);
    },
  });

  useEffect(() => {
    if (code && state) verifyAuthMutation.mutate({ code, state });
  }, [code, state]);

  return <>{verifyAuthMutation.isLoading && "Loading..."}</>;
};

export default LinkPage;
