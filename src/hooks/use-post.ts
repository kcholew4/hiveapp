import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { Post, FirestorePostType } from "../firebase/types";
import { uploadMedia } from "../helpers";

export const useCreatePost = ({ onError }: { onError: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (
    groupId: string,
    type: FirestorePostType,
    content: string | { lat: number; lng: number } | File | Blob
  ) => {
    setIsLoading(true);
    try {
      let storedContent: string | { lat: number; lng: number } = "";

      if (type === "TEXT") {
        if (typeof content !== "string" || !content.trim()) {
          setIsLoading(false);
          return;
        }
        storedContent = content.trim();
      }

      if (type === "IMAGE" && content instanceof File) {
        storedContent = await uploadMedia(groupId, content, "jpg");
      }

      if (type === "SOUND" && content instanceof Blob) {
        storedContent = await uploadMedia(groupId, content, "webm");
      }

      if (type === "LOCATION" && typeof content === "object") {
        storedContent = content as { lat: number; lng: number };
      }

      await addDoc(collection(db, "posts"), {
        groupId,
        type,
        content: storedContent,
      });
    } catch {
      onError();
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading };
};

export const useGroupPosts = (
  groupId: string,
  { onError }: { onError: () => void }
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("groupId", "==", groupId));
    return onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Post, "id">),
        })) as Post[];
        setPosts(docs);
        setIsLoading(false);
      },
      () => {
        onError();
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return { posts, isLoading };
};
