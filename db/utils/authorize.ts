import { firestore } from "@/admin";
import { UserTokens } from "@/models/user";
import Spotify from "@/spotify";
import SpotifyWebApi from "spotify-web-api-node";

/**
 * Authorizes the API for a given user
 */
export async function authorize(
  Spotify: SpotifyWebApi,
  uid: string
): Promise<void> {
  try {
    const userTokensDoc = await firestore
      .collection("users")
      .doc(uid)
      .collection("private")
      .doc("tokens")
      .get();
    const tokens = userTokensDoc.data() as UserTokens;
    Spotify.setAccessToken(tokens.accessToken);
    Spotify.setRefreshToken(tokens.refreshToken);
    const response = await Spotify.refreshAccessToken();
    const accessToken = response.body.access_token;
    await userTokensDoc.ref.update({
      accessToken,
    });
    Spotify.setAccessToken(accessToken);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default Spotify;
