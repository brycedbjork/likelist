import spotify from "@/spotify";
import { NextApiRequest, NextApiResponse } from "next";

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const Spotify = spotify();
    const state = req.query.state as string;

    // Scopes to request.
    const OAUTH_SCOPES = [
      "ugc-image-upload",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "user-library-modify",
      "user-top-read",
      "playlist-read-private",
      "user-follow-read",
      "user-read-recently-played",
      "playlist-modify-private",
      "user-library-read",
      "user-read-email",
      "user-read-private",
    ];

    const authorizeURL = Spotify.createAuthorizeURL(OAUTH_SCOPES, state);
    res.redirect(authorizeURL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default auth;
