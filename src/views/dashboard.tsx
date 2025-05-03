import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleMyGroupsClick = () => navigate("/my-groups");
  const handleNewGroupsClick = () => navigate("/new-groups");

  return (
    <Box>
      <Heading>Dashboard</Heading>
      <Button mt={6} size="xl" w="full" onClick={handleMyGroupsClick}>
        My groups
      </Button>
      <Button mt={4} size="xl" w="full" onClick={handleNewGroupsClick}>
        Find new Groups
      </Button>
    </Box>
  );
};
