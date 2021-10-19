import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/admin";
import { syncUser } from "./sync";
import { withSentry } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";

async function cron(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        // get all users
        const usersQuery = await firestore.collection("users").get();

        // for each user -> run sync
        for (const userDoc of usersQuery.docs) {
          await syncUser(userDoc.id).catch((e) => {
            Sentry.captureException(e);
          });
        }

        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default withSentry(cron);
