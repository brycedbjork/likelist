import * as admin from "firebase-admin";
import serviceAccount from "@/service-account.json";

if (admin.apps.length < 1)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://likelistxyz.firebaseio.com",
  });

export const firestore = admin.firestore();
export const auth = admin.auth();
