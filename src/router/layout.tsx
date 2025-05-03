import { Avatar, Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppLogo, BackButton } from "../ui";

type LayoutProps = {
  children: ReactNode;
  authenticated?: boolean;
};

export const Layout = ({ children, authenticated }: LayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDashboard = authenticated && pathname === "/dashboard";

  const handlePreviousView = () => navigate(-1);
  const handleLogOut = () => {};

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <BackButton
          logoutIcon={isDashboard}
          onClick={isDashboard ? handleLogOut : handlePreviousView}
        />
        <AppLogo />
        {authenticated && (
          <Avatar.Root>
            <Avatar.Fallback name="Marilyn Monroe" />
          </Avatar.Root>
        )}
      </Flex>
      {children}
    </Box>
  );
};
