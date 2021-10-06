import api from "@/db/utils/api";
import { auth, firestore } from "@/firebase";
import { User } from "@/models/user";
import { signInWithCustomToken } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";

// takes code and verification state and returns user
const startSync = async (uid: string): Promise<void> => {
  try {
    const response: {
      data: { success: boolean; error?: Error };
    } = await api().post(`sync?uid=${uid}`);

    if (response.data.error) throw response.data.error;

    return;
  } catch (error) {
    console.log(error);
  }
};
export default startSync;
