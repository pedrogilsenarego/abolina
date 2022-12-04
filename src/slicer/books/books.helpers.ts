import { firestore } from "./../../firebase/utils";

export const handleFetchBooks = ({persistProducts = []}) => {
  return new Promise((resolve, reject) => {
    
    const pageSize=10

    let ref = firestore
      .collection("books")
      .limit(pageSize);
    
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
      .catch((err:any) => {
        reject(err);
      });
  });
};