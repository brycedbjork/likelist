import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

const initialized = admin.apps.length > 0;
if (!initialized) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://likelistxyz.firebaseio.com",
  });
}

export const firestore = admin.firestore();
if (!initialized) {
  firestore.settings({ ignoreUndefinedProperties: true });
}

export const auth = admin.auth();
