import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect, useCallback } from "react";
import { Post, FirestorePostType } from "../firebase/types";
import { uploadMedia } from "../helpers";

export const useCreatePost = ({ onError }: { onError: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (
    uid: string,
    groupId: string,
    type: FirestorePostType,
    content: string | { lat: number; lng: number } | File | Blob
  ) => {
    setIsLoading(true);
    try {
      let storedContent: string | { lat: number; lng: number } = "";

      switch (type) {
        case "TEXT":
          if (typeof content !== "string" || !content.trim()) {
            throw new Error("Text content missing");
          }
          storedContent = content.trim();
          break;
        case "IMAGE":
          if (!(content instanceof File)) {
            throw new Error("Invalid image content");
          }
          storedContent = await uploadMedia(groupId, content, "jpg");
          break;
        case "SOUND":
          if (!(content instanceof Blob)) {
            throw new Error("Invalid sound content");
          }
          storedContent = await uploadMedia(groupId, content, "mp3");
          break;
        case "LOCATION":
          if (
            typeof content !== "object" ||
            content === null ||
            !("lat" in (content as object)) ||
            !("lng" in (content as object))
          ) {
            throw new Error("Invalid location content");
          }
          storedContent = content as { lat: number; lng: number };
          break;
      }

      await addDoc(collection(db, "posts"), {
        groupId,
        type,
        content: storedContent,
        createdBy: uid,
        likedBy: [],
      });
    } catch (err) {
      onError();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading };
};

export const useGroupPosts = (
  groupId: string,
  uid: string,
  { onError }: { onError: () => void }
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("groupId", "==", groupId));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((d) => {
          const data = d.data() as Omit<Post, "id">;
          return {
            id: d.id,
            ...data,
            canDelete: data.createdBy === uid,
          } as Post;
        });
        setPosts(docs);
        setIsLoading(false);
      },
      (err) => {
        onError();
        console.error(err);
        setIsLoading(false);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, uid]);

  return { posts, isLoading };
};

export const useLikePost = (postId: string, uid: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ref = doc(db, "posts", postId);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        return;
      }
      const data = snap.data() as { likedBy: string[] };
      setIsLiked(data.likedBy.includes(uid));
    });
    return unsub;
  }, [postId, uid]);

  const toggleLike = useCallback(async () => {
    setIsLoading(true);
    try {
      const ref = doc(db, "posts", postId);
      if (isLiked) {
        await updateDoc(ref, { likedBy: arrayRemove(uid) });
      } else {
        await updateDoc(ref, { likedBy: arrayUnion(uid) });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, postId, uid]);

  return { toggleLike, isLiked, isLoading };
};

export const useDeletePost = (postId: string, uid: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = useCallback(async () => {
    setIsLoading(true);
    try {
      const ref = doc(db, "posts", postId);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        throw new Error("Post not found");
      }
      const data = snap.data() as { createdBy: string };
      if (data.createdBy !== uid) {
        throw new Error("You are not allowed to delete this post");
      }
      await deleteDoc(ref);
    } finally {
      setIsLoading(false);
    }
  }, [postId, uid]);

  return { deletePost, isLoading };
};
