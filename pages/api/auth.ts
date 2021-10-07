import Spotify from "@/spotify";
import { NextApiRequest, NextApiResponse } from "next";

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const state = req.query.state as string;

    // Scopes to request.
    const OAUTH_SCOPES = [
      "ugc-image-upload",
      "playlist-modify-public",
      "user-library-read",
      "user-read-email",
    ];

    const authorizeURL = Spotify.createAuthorizeURL(OAUTH_SCOPES, state);
    res.redirect(authorizeURL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default auth;
