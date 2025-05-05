import { Box, Heading, Spinner } from "@chakra-ui/react";
import { GroupCard } from "../components";
import { toaster } from "../ui";
import { useGroups, useJoinGroup } from "../hooks";
import { useSession } from "../contexts";
import { useNavigate } from "react-router";

export const NewGroups = () => {
  const navigate = useNavigate();
  const { uid } = useSession();
  const { joinGroup, isLoading: isJoinLoading } = useJoinGroup({
    onSuccess: (groupId) => {
      toaster.success({ description: "You joined the group" });
      navigate(`/groups/${groupId}`);
    },
    onError: () =>
      toaster.error({ description: "There was an error joining group" }),
  });

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
        {groups.map(({ id, name, description, members }) => {
          const isMember = members.includes(uid);
          return (
            <GroupCard
              loading={isJoinLoading}
              key={id}
              name={name}
              description={description}
              canEnter={isMember}
              onJoin={() => joinGroup(uid, id)}
              onEnter={() => navigate(`/groups/${id}`)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
