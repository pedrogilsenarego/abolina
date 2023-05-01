import { firestore } from "../firebase/utils";
import firebase from "firebase/app"

export const handleAddCollection = (payload: {value:string, title:string}) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("general")
      .doc("collections")
      .update({
        available: firebase.firestore.FieldValue.arrayUnion({
          value: payload.value,
          title: payload.title
        })
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
