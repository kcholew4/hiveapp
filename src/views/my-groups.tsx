import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../components";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router";
import { useMyGroups } from "../hooks";
import { useSession } from "../contexts";
import { toaster } from "../ui";

export const MyGroups = () => {
  const navigate = useNavigate();
  const { uid } = useSession();
  const { groups, isLoading } = useMyGroups(uid, {
    onError: () =>
      toaster.error({ description: "There was an error fetching groups" }),
  });

  if (isLoading) {
    return <Spinner size="md" />;
  }

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Heading>My Groups</Heading>
        <Button variant="outline" onClick={() => navigate("/create-group")}>
          <IoIosAdd />
          Add
        </Button>
      </Flex>
      <Box spaceY={4} mt={6}>
        {groups.map(({ id, name, description }) => (
          <GroupCard
            key={id}
            name={name}
            description={description}
            canEnter
            onEnter={() => navigate(`/groups/${id}`)}
          />
        ))}
      </Box>
    </Box>
  );
};
