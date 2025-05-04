import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "../hooks";
import { useNavigate } from "react-router";
import { Spinner } from "@chakra-ui/react";
import { SessionProvider } from "../contexts";
import { LoggedInLayout } from "./logged-in-layout";

type ProtectedViewProps = {
  children: ReactNode;
};

export const ProtectedView = ({ children }: ProtectedViewProps) => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <SessionProvider
      value={{
        uid: currentUser.uid,
      }}
    >
      <LoggedInLayout>{children}</LoggedInLayout>
    </SessionProvider>
  );
};
