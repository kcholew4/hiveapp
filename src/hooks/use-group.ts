import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
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
      .catch((error) => (console.log(error), onError()))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { groups, isLoading };
};

export const useJoinGroup = ({
  onSuccess,
  onError,
}: {
  onSuccess: (groupId: string) => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const joinGroup = async (uid: string, groupId: string) => {
    setIsLoading(true);
    updateDoc(doc(db, "groups", groupId), {
      members: arrayUnion(uid),
    })
      .then(() => onSuccess(groupId))
      .catch(() => onError())
      .finally(() => setIsLoading(false));
  };

  return { joinGroup, isLoading };
};

export const useGroupDetails = (
  id: string,
  { onError }: { onError: () => void }
) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    return onSnapshot(
      doc(db, "groups", id),
      (snapshot) => {
        if (snapshot.exists()) {
          setGroup({
            id: snapshot.id,
            ...(snapshot.data() as Omit<Group, "id">),
          });
        }

        setIsLoading(false);
      },
      onError
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { group, isLoading };
};
