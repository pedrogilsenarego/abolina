import { firestore, auth } from "../../firebase/utils";
import { CurrentUser } from "./user.types";

export const handleUserProfile = async ({ userAuth, additionalData }:any) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const handleRecoverPassword = async (email:any) => {
  return new Promise<void>((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export const handleMutateUserSettings = (payload:{userFields:Partial<CurrentUser>, id:string}) => {
  const { id, userFields } = payload;
  
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection("users")
      .doc(id)
      .update(userFields) 
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
