import { Box, Heading } from "@chakra-ui/react";
import { GroupCard } from "../components";
import { groups } from "../mocks";

export const MyGroups = () => {
  return (
    <Box>
      <Heading>My Groups</Heading>
      <Box spaceY={4} mt={6}>
        {groups.slice(0, 2).map(({ id, title, description }) => (
          <GroupCard key={id} title={title} description={description} />
        ))}
      </Box>
    </Box>
  );
};
