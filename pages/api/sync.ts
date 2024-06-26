import { NextApiRequest, NextApiResponse } from "next";
import Spotify from "@/spotify";
import { User } from "@/models/user";
import { firestore } from "@/admin";
import { authorize } from "@/db/utils/authorize";
import moment from "moment";
import { withSentry } from "@sentry/nextjs";
import slugify from "@/lib/slugify";

/**
 * Get liked track uri's
 */
async function getLikedTracks(): Promise<string[]> {
  try {
    let offset = 0;
    const limit = 50;
    const response = await Spotify.getMySavedTracks({ offset, limit });
    const total = response.body.total;
    let tracks = response.body.items.map((item) => item.track.uri);

    while (offset < total) {
      const nextResponse = await Spotify.getMySavedTracks({ offset, limit });
      tracks = [
        ...tracks,
        ...nextResponse.body.items.map((item) => item.track.uri),
      ];
      offset += limit;
    }

    return [...new Set(tracks)];
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * Get track uri's from playlist id
 */
async function getTracksFromPlaylist(playlistId: string): Promise<string[]> {
  try {
    let offset = 0;
    const limit = 50;
    const response = await Spotify.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    const total = response.body.total;
    let tracks = response.body.items.map((item) => item.track.uri);

    while (offset < total) {
      const nextResponse = await Spotify.getPlaylistTracks(playlistId, {
        offset,
        limit,
      });
      tracks = [
        ...tracks,
        ...nextResponse.body.items.map((item) => item.track.uri),
      ];
      offset += limit;
    }

    return [...new Set(tracks)];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function syncUser(uid: string) {
  await authorize(uid);

  // get user
  const userDoc = await firestore.collection("users").doc(uid).get();
  const user = userDoc.data() as User;

  const likedTracks = await getLikedTracks();

  let syncedId = user.syncedPlaylistId;

  const createPlaylist = async () => {
    const spotifyResponse = await Spotify.createPlaylist(
      `${slugify(user.name)}'s Likes`,
      {
        description: `🎵 ${user.slug}.likelist.xyz`,
        public: true,
      }
    );
    syncedId = spotifyResponse.body.id;
    await userDoc.ref.update({ syncedPlaylistId: syncedId });
  };

  // create playlist if no saved synced id
  if (!syncedId) {
    await createPlaylist();
  } else {
    // check to make sure synced playlist exists, otherwise recreate it
    try {
      const playlist = await Spotify.getPlaylist(syncedId);
      if (!playlist) await createPlaylist();
    } catch (e) {
      await createPlaylist();
    }
  }

  const syncedTracks = await getTracksFromPlaylist(syncedId);

  // check what needs to be updated
  const tracksToAdd: string[] = [];
  const tracksToRemove: string[] = [];
  for (const likedTrack of likedTracks) {
    if (!syncedTracks.includes(likedTrack)) {
      tracksToAdd.push(likedTrack);
    }
  }
  for (const syncedTrack of syncedTracks) {
    if (!likedTracks.includes(syncedTrack)) {
      tracksToRemove.push(syncedTrack);
    }
  }

  // add tracks
  let i = 0;
  const addTracks = async (tracks: string[]): Promise<void> => {
    if (tracks.length === 0) return;
    if (tracks.length > 100) {
      await Spotify.addTracksToPlaylist(syncedId, tracks.slice(0, 100), {
        position: i,
      });
      i += 100;
      await addTracks(tracks.slice(100));
    } else {
      await Spotify.addTracksToPlaylist(syncedId, tracks, {
        position: i,
      });
    }
    return;
  };
  await addTracks(tracksToAdd);

  // remove tracks
  const removeTracks = async (tracks: string[]): Promise<void> => {
    if (tracks.length === 0) return;
    if (tracks.length > 100) {
      await Spotify.removeTracksFromPlaylist(
        syncedId,
        tracks.slice(0, 100).map((track) => ({ uri: track }))
      );
      await removeTracks(tracks.slice(100));
    } else {
      await Spotify.removeTracksFromPlaylist(
        syncedId,
        tracks.map((track) => ({ uri: track }))
      );
    }
    return;
  };
  await removeTracks(tracksToRemove);

  userDoc.ref.update({ lastSynced: moment().unix() });
}

/**
 * Gets tokens from Spotify
 */
async function sync(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const uid = req.query.uid as string;

    await syncUser(uid);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export default withSentry(sync);
