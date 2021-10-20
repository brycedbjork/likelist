import App from "@/components/App";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import RobotsWorking from "@/components/RobotsWorking";
import startSync from "@/db/startSync";
import getSlugUser from "@/db/getSlugUser";
import Head from "next/head";
import { User } from "@/models/user";
import { firestore } from "@/admin";

type Props = {
  user: User;
};

const GoPage: NextPage<Props> = (props) => {
  const router = useRouter();
  const { user } = props;
  const slug = router.query.slug as string;

  useQuery(["slugUser", slug], getSlugUser(slug), {
    initialData: user,
    onSuccess: (user) => {
      startSync(user.id).catch((e) => console.log(e));
      router.push(`https://open.spotify.com/playlist/${user.syncedPlaylistId}`);
    },
    onError: () => {
      router.push(`https://likelist.xyz`);
    },
  });

  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <App>
        <RobotsWorking title="Syncing likelist" />
      </App>
    </>
  );
};

export default GoPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params.slug as string;
  const user = await getSlugUser(slug)();
  return { props: { user }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const usersQuery = await firestore.collection("users").get();
  const users = usersQuery.docs.map((userDoc) => userDoc.data() as User);
  const paths = users.map((user) => ({ params: { slug: user.slug } }));

  return {
    paths,
    fallback: true,
  };
};
