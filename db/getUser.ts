import { firestore } from "@/firebase";
import { User } from "@/models/user";
import { getDoc, doc } from "@firebase/firestore";

const getUser = (userId: string) => async (): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(firestore, `users/${userId}`));
    if (userDoc.exists) return userDoc.data() as User;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
