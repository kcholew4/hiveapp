import { ReactNode } from "react";
import { SessionContext } from "./session-context";
import { UserSession } from "../../firebase";

type SessionProviderProps = {
  children: ReactNode;
  value: UserSession;
};

export const SessionProvider = ({ children, value }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
