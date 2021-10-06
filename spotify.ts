import SpotifyWebApi from "spotify-web-api-node";

const spotify = () =>
  new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/link`
        : `https://likelist.xyz/link`,
  });

export default spotify;
