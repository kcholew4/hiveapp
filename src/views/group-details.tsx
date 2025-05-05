import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useGroupDetails } from "../hooks";
import { useCreatePost, useGroupPosts } from "../hooks";
import { toaster } from "../ui";
import { PostComposer, PostList } from "../components";
import { FirestorePostType } from "../firebase/types";

export const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("Group id missing in route");
  }

  const { group, isLoading: loadingGroup } = useGroupDetails(id, {
    onError: () => toaster.error({ description: "Error loading group" }),
  });

  const { posts, isLoading: loadingPosts } = useGroupPosts(id, {
    onError: () => toaster.error({ description: "Error loading posts" }),
  });

  const { createPost, isLoading: creating } = useCreatePost({
    onError: () => toaster.error({ description: "Error creating post" }),
  });

  const handleSend = (
    type: FirestorePostType,
    content: string | { lat: number; lng: number } | File | Blob
  ) => {
    createPost(id, type, content);
  };

  if (loadingGroup) {
    return <Spinner size="md" />;
  }

  if (!group) {
    return null;
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        {group.name}
      </Heading>
      <PostComposer loading={creating} onSend={handleSend} />
      <Box mt={4}>
        <PostList posts={posts} loading={loadingPosts} />
      </Box>
    </Box>
  );
};
