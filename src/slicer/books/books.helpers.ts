import { firestore } from "./../../firebase/utils";
import { storage } from "./../../firebase/utils";

export const handleFetchBooks = ({ persistProducts = [] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 10;

    let ref = firestore.collection("books").limit(pageSize);

    ref
      .get()
      .then((snapshot: any) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc: any) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const handleFetchBook = (documentID: string) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

interface AddCoverPage {
  title: string;
  coverPage2: any;
}

export const handleAddCoverPage = ({ title, coverPage2 }: AddCoverPage) => {
  return new Promise<void>((resolve, reject) => {
    storage
      .ref(`books/${title}/${coverPage2.name}`)
      .put(coverPage2)
      .then(() => {
        storage
          .ref("books")
          .child(title)
          .child(coverPage2.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url)
            console.log(url);
            
          });
      })
      .catch((err) => {
        reject(err);
      });
    // storageRef.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // const progressD = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //     // setProgress(progressD)
    //   },
  });
};

export const handleAddBook = (payload: any) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc()
      .set(payload)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
