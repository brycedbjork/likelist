import App from "@/components/App";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import RobotsWorking from "@/components/RobotsWorking";
import startSync from "@/db/startSync";
import getSlugUser from "@/db/getSlugUser";
import Head from "next/head";

const GoPage: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  useQuery(["slugUser", slug], getSlugUser(slug), {
    onSuccess: (user) => {
      startSync(user.id).catch((e) => console.log(e));
      router.push(`https://open.spotify.com/playlist/${user.syncedPlaylistId}`);
    },
  });

  return (
    <>
      <Head>
        <title>{slug}.likelist.xyz</title>
        <meta name="robots" content="noindex" />
      </Head>
      <App>
        <RobotsWorking title="Syncing likelist" />
      </App>
    </>
  );
};

export default GoPage;
