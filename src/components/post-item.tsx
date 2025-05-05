import { Box, Text, Image, Link, Icon, HStack } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { Post } from "../firebase/types";

export type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Box p={3} rounded="lg" borderWidth="1px" bg="white" mb={3}>
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
  );
};
