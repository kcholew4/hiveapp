import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, Group } from "../firebase";
import { useEffect, useState } from "react";

type NewGroup = {
  name: string;
  description: string;
};

export const useCreateGroup = ({
  onSuccess,
  onError,
}: {
  onSuccess: (id: string) => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const createGroup = async (
    userId: string,
    { name, description }: NewGroup
  ) => {
    setIsLoading(true);
    addDoc(collection(db, "groups"), { name, description, members: [userId] })
      .then((group) => onSuccess(group.id))
      .catch(() => onError())
      .finally(() => setIsLoading(false));
  };

  return { createGroup, isLoading };
};

export const useMyGroups = (
  uid: string,
  { onError }: { onError: () => void }
) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "groups"),
      where("members", "array-contains", uid)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Group, "id">),
        }));

        setGroups(data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        onError();
      }
    );
  }, [uid, onError]);

  return { groups, isLoading };
};

export const useGroups = ({ onError }: { onError: () => void }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Group, "id">),
        }));

        setGroups(data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        onError();
      }
    );
  }, [onError]);

  return { groups, isLoading };
};
