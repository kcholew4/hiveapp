import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

type PostComposerProps = {
  onSend: (content: string) => void;
  isPosting: boolean;
};

export const PostComposer = ({ onSend, isPosting }: PostComposerProps) => {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) {
      return;
    }

    onSend(content.trim());
    setContent("");
  };

  return (
    <Box p={3} borderWidth="1px" rounded="lg" bg="white">
      <Textarea
        placeholder="Write something…"
        size="sm"
        mb={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <HStack justify="flex-end">
        <Button size="sm" onClick={handleSend} loading={isPosting}>
          Post
        </Button>
      </HStack>
    </Box>
  );
};
