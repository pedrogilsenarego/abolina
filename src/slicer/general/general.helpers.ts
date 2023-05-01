import { firestore } from "./../../firebase/utils";

export const handleFetchCollections = () => {
 
  return new Promise((resolve, reject) => {
    firestore
      .collection("general")
      .doc("collections")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
          console.log(snapshot.data())
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};