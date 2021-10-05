import api from "@/db/utils/api";
import { auth, firestore } from "@/firebase";
import { User } from "@/models/user";
import { signInWithCustomToken } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";

// takes code and verification state and returns user
const verifyAuth = async (data: {
  code: string;
  state: string;
}): Promise<User> => {
  try {
    const { code, state } = data;
    const authState = localStorage.getItem("authState");

    if (state != authState)
      throw new Error("Verification states did not match");

    const response: {
      data: { token: string; error?: Error };
    } = await api().post(`token?code=${code}`);

    if (response.data.error) throw response.data.error;

    const tokenResponse = await signInWithCustomToken(
      auth,
      response.data.token
    );

    // check to see if user has already synced
    const userDoc = await getDoc(
      doc(firestore, `users/${tokenResponse.user.uid}`)
    );
    const user = userDoc.data() as User;

    return user;
  } catch (error) {
    console.log(error);
  }
};
export default verifyAuth;
