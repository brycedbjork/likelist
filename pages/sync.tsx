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
import startSync from "@/db/startSync";

const syncPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const startSyncMutation = useMutation(startSync, {
    onSuccess: () => {
      router.push(`/me?uid=${uid}`);
    },
  });

  useEffect(() => {
    if (uid) startSyncMutation.mutate(uid);
  }, [uid]);

  return (
    <App>
      <RobotsWorking title="Syncing your music" />
    </App>
  );
};

export default syncPage;
