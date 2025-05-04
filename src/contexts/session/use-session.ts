import { useContext } from "react";
import { SessionContext } from "./session-context";

export const useSession = () => {
  const session = useContext(SessionContext);

  if (session === null) {
    throw new Error("context value cannot be null");
  }

  return session;
};
