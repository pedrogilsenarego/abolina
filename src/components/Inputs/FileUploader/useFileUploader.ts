import { storage } from "../../../firebase/utils";
import { useState } from "react";

interface Props {
  imageUpload: any;
  setImage: (coverPage: string) => void;
}

const useFileUploader = ({ imageUpload, setImage }: Props) => {
  const [progress, setProgress] = useState<number>(0);

  const uploadImage = (title: string) => {
    if (imageUpload == null) return;
    const storageRef = storage
      .ref(`books/${title}/${imageUpload.name}`)
      .put(imageUpload);
    storageRef.on(
      "state_changed",
      (snapshot) => {
        const progressD = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressD);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("books")
          .child(title)
          .child(imageUpload.name)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
          });
      }
    );
  };

  return { uploadImage, progress };
};

export default useFileUploader;
