import { useRef, useState } from "react";

export const useAudioRecorder = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const parts: BlobPart[] = [];

      rec.start();

      rec.ondataavailable = (ev) => parts.push(ev.data);
      rec.onstop = () => setAudioBlob(new Blob(parts, { type: "audio/webm" }));

      setRecorder(rec);
      setIsRecording(true);
    } else {
      recorder?.stop();
      setIsRecording(false);
    }
  };

  const reset = () => setAudioBlob(undefined);

  return { audioBlob, isRecording, toggleRecording, reset };
};

export const useImageCapture = () => {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pickImage = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const reset = () => setImageFile(undefined);

  return { imageFile, fileInputRef, pickImage, handleChange, reset };
};

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const request = () =>
    new Promise<{ lat: number; lng: number } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(loc);
          resolve(loc);
        },
        () => resolve(null)
      );
    });

  const reset = () => setCoords(null);

  return { coords, request, reset };
};
