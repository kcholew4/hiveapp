import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Post } from "../firebase";

export const useCreatePost = ({ onError }: { onError: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (groupId: string, content: string) => {
    setIsLoading(true);
    addDoc(collection(db, "posts"), { groupId, content })
      .catch(onError)
      .finally(() => setIsLoading(false));
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
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }));
        setPosts(data);
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
