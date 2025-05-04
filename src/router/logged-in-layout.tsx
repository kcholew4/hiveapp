import { Avatar, Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import { LuLogOut } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

type LoggedInLayoutProps = {
  children: ReactNode;
};

export const LoggedInLayout = ({ children }: LoggedInLayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isDashboard = pathname === "/dashboard";

  const handlePreviousView = () => navigate(-1);
  const handleLogOut = () => {};

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Button
          variant="plain"
          px={0}
          onClick={isDashboard ? handleLogOut : handlePreviousView}
        >
          {isDashboard ? <LuLogOut /> : <FaArrowLeft />}
        </Button>
        <Button unstyled>
          <Flex gap={2} align="center">
            <Image src={logo} w={10} h={10} />
            <Heading>HiveApp</Heading>
          </Flex>
        </Button>
        <Avatar.Root>
          <Avatar.Fallback name="Marilyn Monroe" />
        </Avatar.Root>
      </Flex>
      {children}
    </Box>
  );
};
