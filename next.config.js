const getUsersUrl = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/users`;

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
  async redirects() {
    const response = await fetch(getUsersUrl);
    const data = await response.json();

    const users = data.documents
      .map((doc) =>
        doc && doc.fields && doc.fields.slug && doc.fields.syncedPlaylistId
          ? {
              slug: doc.fields.slug.stringValue,
              syncedPlaylistId: doc.fields.syncedPlaylistId.stringValue,
            }
          : null
      )
      .filter((v) => v !== null);

    const redirects = users
      .map((user) => [
        {
          has: [
            {
              type: "host",
              value: `${user.slug}.(localhost|likelist.xyz)`,
            },
          ],
          source: "/",
          destination: `https://open.spotify.com/playlist/${user.syncedPlaylistId}`,
          permanent: false,
        },
      ])
      .flat();

    return redirects;
  },
};
