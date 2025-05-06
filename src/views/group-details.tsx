import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { useGroupDetails, useLeaveGroup } from "../hooks";
import { useCreatePost, useGroupPosts } from "../hooks";
import { toaster } from "../ui";
import { PostComposer, PostList } from "../components";
import { FirestorePostType } from "../firebase/types";
import { useSession } from "../contexts";

export const GroupDetails = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const { uid } = useSession();
  const navigate = useNavigate();

  if (!groupId) {
    throw new Error("Group id missing in route");
  }

  const { group, isLoading: loadingGroup } = useGroupDetails(groupId, {
    onError: () => toaster.error({ description: "Error loading group" }),
  });

  const { posts, isLoading: loadingPosts } = useGroupPosts(groupId, uid, {
    onError: () => toaster.error({ description: "Error loading posts" }),
  });

  const { createPost, isLoading: creating } = useCreatePost({
    onError: () => toaster.error({ description: "Error creating post" }),
  });

  const { leaveGroup, isLoading: leaving } = useLeaveGroup({
    onSuccess: () => navigate("/my-groups"),
    onError: () =>
      toaster.error({ description: "There was an error leaving the group" }),
  });

  const handleSend = (
    type: FirestorePostType,
    content: string | { lat: number; lng: number } | File | Blob
  ) => {
    createPost(uid, groupId, type, content);
  };

  if (loadingGroup) {
    return <Spinner size="md" />;
  }

  if (!group) {
    return null;
  }

  return (
    <Box p={4}>
      <Flex justify="space-between">
        <Box maxW="1/2">
          <Heading size="md" mb={1}>
            {group.name}
          </Heading>
          <Text color="fg.muted" mb={4}>
            {group.description}
          </Text>
        </Box>
        <Button
          variant="outline"
          loading={leaving}
          onClick={() => leaveGroup(uid, groupId)}
        >
          Leave group
        </Button>
      </Flex>
      <PostComposer loading={creating} onSend={handleSend} />
      <Box mt={4}>
        <PostList posts={posts} loading={loadingPosts} />
      </Box>
    </Box>
  );
};
