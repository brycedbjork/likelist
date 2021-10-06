import { firestore } from "@/firebase";
import { User } from "@/models/user";
import { getDocs, query, collection, where } from "@firebase/firestore";

const getSlugUser = (slug: string) => async (): Promise<User | null> => {
  const userDocs = await getDocs(
    query(collection(firestore, `/users`), where("slug", "==", slug))
  );
  if (userDocs.size === 0) throw new Error("No user with slug");
  return userDocs.docs[0].data() as User;
};

export default getSlugUser;
