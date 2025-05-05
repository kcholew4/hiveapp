import { VStack, Spinner } from "@chakra-ui/react";
import { PostItem } from "./post-item";
import { Post } from "../firebase";

type PostListProps = {
  posts: Post[];
  loading: boolean;
};

export const PostList = ({ posts, loading }: PostListProps) => {
  if (loading) {
    return <Spinner size="md" />;
  }

  return (
    <VStack align="stretch">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </VStack>
  );
};
