import { Box, Heading, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../components";
import { toaster } from "../ui";
import { useGroups } from "../hooks";

export const NewGroups = () => {
  const { groups, isLoading } = useGroups({
    onError: () =>
      toaster.error({ description: "There was an error fetching groups" }),
  });

  if (isLoading) {
    return <Spinner size="md" />;
  }

  return (
    <Box>
      <Heading>Browse groups</Heading>
      <Box spaceY={4} mt={6}>
        {groups.map(({ id, name, description }) => (
          <GroupCard key={id} name={name} description={description} />
        ))}
      </Box>
    </Box>
  );
};
