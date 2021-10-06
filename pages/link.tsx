import colors from "@/lib/colors";
import App from "@/components/App";
import startAuth from "@/db/startAuth";
import verifyAuth from "@/db/verifyAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import RobotsWorking from "@/components/RobotsWorking";

const LinkPage: NextPage = () => {
  const router = useRouter();
  const code = router.query.code as string;
  const state = router.query.state as string;

  const verifyAuthMutation = useMutation(verifyAuth, {
    onSuccess: (user) => {
      if (user && user.slug) router.push(`/me?uid=${user.id}`);
      else router.push(`/choose?uid=${user.id}`);
    },
  });

  useEffect(() => {
    if (code && state)
      setTimeout(() => verifyAuthMutation.mutate({ code, state }), 2000);
  }, [code, state]);

  return (
    <App>
      <RobotsWorking title="Connecting Spotify" />
    </App>
  );
};

export default LinkPage;
