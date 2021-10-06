import { firestore } from "@/firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";

// function that takes slug (eg. "bryce" for bryce.likelist.xyz) and return boolean available or not
const testSlug = async (slug: string): Promise<boolean> => {
  const userDocs = await getDocs(
    query(collection(firestore, `/users`), where("slug", "==", slug))
  );
  const slugAvailable = userDocs.size === 0;
  return slugAvailable;
};

export default testSlug;
