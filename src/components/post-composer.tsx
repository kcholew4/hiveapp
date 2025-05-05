import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  FiCamera,
  FiMic,
  FiMapPin,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import { useState } from "react";
import { useImageCapture, useAudioRecorder, useGeolocation } from "../hooks";
import { FirestorePostType } from "../firebase/types";

export type PostComposerProps = {
  onSend: (
    type: FirestorePostType,
    content: string | { lat: number; lng: number } | File | Blob
  ) => void;
  loading: boolean;
};

export const PostComposer = ({ onSend, loading }: PostComposerProps) => {
  const [mode, setMode] = useState<FirestorePostType>("TEXT");
  const [text, setText] = useState("");

  const {
    imageFile,
    fileInputRef,
    pickImage,
    handleChange: handleImageChange,
    reset: resetImage,
  } = useImageCapture();

  const {
    audioBlob,
    isRecording,
    toggleRecording,
    reset: resetAudio,
  } = useAudioRecorder();

  const { coords, request: requestGeo, reset: resetGeo } = useGeolocation();

  const handleSend = () => {
    if (mode === "TEXT") {
      if (!text.trim()) {
        return;
      }

      onSend("TEXT", text.trim());
      setText("");
    }

    if (mode === "IMAGE" && imageFile) {
      onSend("IMAGE", imageFile);
      resetImage();
    }

    if (mode === "SOUND" && audioBlob) {
      onSend("SOUND", audioBlob);
      resetAudio();
    }

    if (mode === "LOCATION" && coords) {
      onSend("LOCATION", coords);
      resetGeo();
    }
  };

  return (
    <Box p={3} borderWidth="1px" rounded="lg" bg="white">
      <HStack gap={1} mb={3}>
        <IconButton
          size="sm"
          variant={mode === "TEXT" ? "solid" : "outline"}
          onClick={() => setMode("TEXT")}
        >
          <FiMessageSquare />
        </IconButton>
        <IconButton
          size="sm"
          variant={mode === "IMAGE" ? "solid" : "outline"}
          onClick={() => setMode("IMAGE")}
        >
          <FiCamera />
        </IconButton>
        <IconButton
          size="sm"
          variant={mode === "SOUND" ? "solid" : "outline"}
          onClick={() => setMode("SOUND")}
          colorPalette={isRecording ? "red" : undefined}
        >
          <FiMic />
        </IconButton>
        <IconButton
          size="sm"
          variant={mode === "LOCATION" ? "solid" : "outline"}
          onClick={() => setMode("LOCATION")}
        >
          <FiMapPin />
        </IconButton>
      </HStack>

      {mode === "TEXT" && (
        <Textarea
          placeholder="Write something…"
          size="sm"
          mb={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {mode === "IMAGE" && (
        <>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleImageChange}
          />
          <Button size="sm" onClick={pickImage} mb={2} variant="subtle">
            {imageFile ? "Change photo" : "Take photo"}
          </Button>
        </>
      )}

      {mode === "SOUND" && (
        <Button size="sm" onClick={toggleRecording} mb={2} variant="subtle">
          {isRecording ? "Stop recording" : "Record audio"}
        </Button>
      )}

      {mode === "LOCATION" && (
        <Button size="sm" onClick={() => requestGeo()} mb={2} variant="subtle">
          {coords ? "Location captured" : "Add current location"}
        </Button>
      )}

      <HStack justify="flex-end">
        <Button size="sm" onClick={handleSend} loading={loading}>
          Send <FiSend />
        </Button>
      </HStack>
    </Box>
  );
};
