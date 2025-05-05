import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadMedia = async (
  groupId: string,
  file: Blob,
  ext: string
): Promise<string> => {
  const fileRef = ref(storage, `posts/${groupId}/${Date.now()}.${ext}`);

  await uploadBytes(fileRef, file);

  return getDownloadURL(fileRef);
};
