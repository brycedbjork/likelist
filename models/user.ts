export interface User {
  id: string;
  phoneNumber: string;
  service: "SPOTIFY" | "APPLEMUSIC";
  serviceId: string;
  name: string;
  email: string;
  joined: number; // unix timestamp
  image: string;
  slug?: string;
  lastSynced?: number;
  syncedPlaylistId?: string;
}

export interface UserTokens {
  accessToken: string;
  refreshToken: string;
}
