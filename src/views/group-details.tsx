import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useGroupDetails } from "../hooks";
import { useCreatePost, useGroupPosts } from "../hooks";
import { toaster } from "../ui";
import { PostComposer, PostList } from "../components";

export const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("id is required");
  }

  const { group, isLoading: loadingGroup } = useGroupDetails(id, {
    onError: () => toaster.error({ description: "Error loading group" }),
  });

  const { posts, isLoading: loadingPosts } = useGroupPosts(id, {
    onError: () => toaster.error({ description: "Error loading posts" }),
  });

  const { createPost, isLoading: isPosting } = useCreatePost({
    onError: () => toaster.error({ description: "Error creating post" }),
  });

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
      <PostComposer
        onSend={(content) => createPost(id as string, content)}
        isPosting={isPosting}
      />
      <Box mt={4}>
        <PostList posts={posts} loading={loadingPosts} />
      </Box>
    </Box>
  );
};
