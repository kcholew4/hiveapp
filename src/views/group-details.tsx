import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useGroupDetails } from "../hooks";
import { toaster } from "../ui";

export const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("id param must be provided");
  }

  const { group, isLoading } = useGroupDetails(id, {
    onError: () =>
      toaster.error({ description: "Failed to load group details" }),
  });

  if (isLoading) {
    return <Spinner size="md" />;
  }

  return (
    <Box>
      <Heading>{group?.name}</Heading>
    </Box>
  );
};
