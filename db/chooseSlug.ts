import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "@firebase/firestore";

const chooseSlug = async (data: {
  uid: string;
  slug: string;
}): Promise<void> => {
  const { uid, slug } = data;
  const lowercaseSlug = slug.toLowerCase();
  const userDocs = await getDocs(
    query(collection(firestore, `/users`), where("slug", "==", lowercaseSlug))
  );
  const slugAvailable = userDocs.size === 0;
  if (!slugAvailable) throw new Error("Slug not available");

  await updateDoc(doc(firestore, `/users/${uid}`), {
    slug: lowercaseSlug,
  });
};

export default chooseSlug;
