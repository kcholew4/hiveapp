import { createContext } from "react";
import { UserSession } from "../../firebase";

export const SessionContext = createContext<UserSession | null>(null);
