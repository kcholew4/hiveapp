import {
  Box,
  Text,
  Image,
  Link,
  Icon,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FiMapPin, FiTrash2 } from "react-icons/fi";
import { Post } from "../firebase/types";
import { useSession } from "../contexts";
import { useDeletePost, useLikePost } from "../hooks";
import { toaster } from "../ui";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => {
  const { uid } = useSession();

  const {
    isLiked,
    toggleLike,
    isLoading: likeLoading,
  } = useLikePost(post.id, uid);

  const { deletePost, isLoading: deleteLoading } = useDeletePost(post.id, uid);

  const handleLike = async () => {
    try {
      await toggleLike();
    } catch {
      toaster.error({ description: "Cannot like post due to an error" });
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost();
    } catch {
      toaster.error({ description: "Cannot delete post due to an error" });
    }
  };

  return (
    <Box p={3} rounded="lg" borderWidth="1px" bg="white" mb={3}>
      <Box p={2}>
        {post.type === "TEXT" && (
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {post.content as string}
          </Text>
        )}

        {post.type === "IMAGE" && (
          <Image
            src={post.content as string}
            rounded="lg"
            maxH="300px"
            objectFit="cover"
          />
        )}

        {post.type === "SOUND" && (
          <audio
            controls
            src={post.content as string}
            style={{ width: "100%" }}
          />
        )}

        {post.type === "LOCATION" && (
          <HStack>
            <Icon as={FiMapPin} />
            <Link
              fontSize="sm"
              color="blue.600"
              href={`https://maps.google.com/?q=${
                (post.content as { lat: number; lng: number }).lat
              },${(post.content as { lat: number; lng: number }).lng}`}
            >
              View location on map
            </Link>
          </HStack>
        )}
      </Box>
      <HStack>
        <IconButton
          rounded="full"
          aria-label={isLiked ? "Unlike" : "Like"}
          onClick={handleLike}
          loading={likeLoading}
          variant="ghost"
        >
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </IconButton>

        <Text fontSize="sm">{post.likedBy.length}</Text>

        {post.canDelete && (
          <IconButton
            ml="auto"
            aria-label="Delete post"
            onClick={handleDelete}
            loading={deleteLoading}
            variant="ghost"
          >
            <FiTrash2 />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};
