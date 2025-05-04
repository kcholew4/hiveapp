import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const createUserDocument = (uid: string, email: string) =>
  setDoc(doc(db, "users", uid), { email }, { merge: true });

export const useCredentialsSignUp = ({
  onSuccess,
  onEmailInUse,
  onError,
}: {
  onSuccess: () => void;
  onEmailInUse: () => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = (email: string, password: string) => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => createUserDocument(user.uid, email))
      .then(onSuccess)
      .catch((error) => {
        if (error?.code === "auth/email-already-in-use") {
          onEmailInUse();
        } else {
          onError();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return { signUp, isLoading };
};

export const useCredentialsLogIn = ({
  onSuccess,
  onInvalidCredentials,
  onError,
}: {
  onSuccess: () => void;
  onInvalidCredentials: () => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const logIn = (email: string, password: string) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(onSuccess)
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          return onInvalidCredentials();
        }

        onError();
      })
      .finally(() => setIsLoading(false));
  };

  return { logIn, isLoading };
};

export const useGoogleLogIn = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const logInWithGoogle = () => {
    setIsLoading(true);

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(({ user }) => createUserDocument(user.uid, user.email ?? ``))
      .then(onSuccess)
      .catch(onError)
      .finally(() => setIsLoading(false));
  };

  return { logInWithGoogle, isLoading };
};

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        (user) => (setCurrentUser(user), setIsLoading(false))
      ),
    []
  );

  return { currentUser, isLoading };
};
