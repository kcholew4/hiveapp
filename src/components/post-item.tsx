import { Box, Text } from "@chakra-ui/react";
import { Post } from "../firebase";

type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => (
  <Box p={3} borderWidth="1px" rounded="lg" bg="white" mb={2}>
    <Text fontSize="sm" whiteSpace="pre-wrap">
      {post.content}
    </Text>
  </Box>
);
