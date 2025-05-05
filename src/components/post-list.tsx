import { VStack, Spinner } from "@chakra-ui/react";
import { Post } from "../firebase/types";
import { PostItem } from "./post-item";

export type PostListProps = {
  posts: Post[];
  loading: boolean;
};

export const PostList = ({ posts, loading }: PostListProps) => {
  if (loading) {
    return <Spinner size="md" />;
  }
  return (
    <VStack align="stretch">
      {posts.map((p) => (
        <PostItem key={p.id} post={p} />
      ))}
    </VStack>
  );
};
