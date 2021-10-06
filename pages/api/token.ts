import { User, UserTokens } from "@/models/user";
import Spotify from "@/spotify";
import { firestore } from "@/admin";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { auth } from "@/admin";

const token = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const code = req.query.code as string;

    Spotify.authorizationCodeGrant(code, (error, data) => {
      if (error) {
        throw error;
      }
      Spotify.setAccessToken(data.body["access_token"]);

      Spotify.getMe(async (spotifyError, userResults) => {
        try {
          if (spotifyError) {
            throw spotifyError;
          }
          // We have a Spotify access token and the user identity now.
          const refreshToken = data.body.refresh_token;
          const accessToken = data.body.access_token;
          const spotifyId = userResults.body.id;
          const photoURL =
            userResults.body.images && userResults.body.images[0]
              ? userResults.body.images[0].url
              : undefined;
          const displayName = userResults.body["display_name"];
          const email = userResults.body["email"];

          // Create a Spotify auth data
          const user = {
            id: spotifyId,
            service: "SPOTIFY",
            serviceId: spotifyId,
            name: displayName,
            image: photoURL,
            email,
            joined: moment().unix(),
          } as User;
          const tokens = {
            refreshToken,
            accessToken,
          } as UserTokens;

          const firebaseToken = await auth.createCustomToken(spotifyId);

          await firestore
            .collection("users")
            .doc(spotifyId)
            .set(user, { merge: true });
          await firestore
            .collection("users")
            .doc(spotifyId)
            .collection("private")
            .doc("tokens")
            .set(tokens, { merge: true });

          return res.status(200).json({ token: firebaseToken });
        } catch (error) {
          throw error;
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ error: JSON.stringify(error) });
  }
};
export default token;
