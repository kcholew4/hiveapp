import { Box, Heading } from "@chakra-ui/react";
import { GroupCard } from "../components";
import { groups } from "../mocks";

export const NewGroups = () => {
  return (
    <Box>
      <Heading>Browse groups</Heading>
      <Box spaceY={4} mt={6}>
        {groups.map(({ id, title, description }) => (
          <GroupCard key={id} title={title} description={description} />
        ))}
      </Box>
    </Box>
  );
};
