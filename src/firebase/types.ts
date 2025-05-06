export interface UserSession {
  uid: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export type FirestorePostType = "TEXT" | "IMAGE" | "SOUND" | "LOCATION";

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
}

interface PostBase {
  id: string;
  groupId: string;
  type: FirestorePostType;
  createdBy: string;
  likedBy: string[];
  canDelete?: boolean;
}

export interface TextPost extends PostBase {
  type: "TEXT";
  content: string;
}

export interface ImagePost extends PostBase {
  type: "IMAGE";
  content: string;
}

export interface SoundPost extends PostBase {
  type: "SOUND";
  content: string;
}

export interface LocationPost extends PostBase {
  type: "LOCATION";
  content: { lat: number; lng: number };
}

export type Post = TextPost | ImagePost | SoundPost | LocationPost;
