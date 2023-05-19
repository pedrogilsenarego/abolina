import { firestore } from "../../firebase/utils";



export const handleSaveSettings = (payload: {newBook:string, discount:number, discountDigital:number}, documentID:string) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("books")
      .doc(documentID)
      .update({
        newBook: payload.newBook,
        discount: payload.discount,
        discountDigital:payload.discountDigital
      })
      .then(() => {
        resolve();
      })
      .catch((err:any) => {
        reject(err);
      });
  });
};
