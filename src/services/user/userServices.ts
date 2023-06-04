import { auth, firestore } from "../../firebase/utils";

export const createAccount = (values:{name:string,email:string,password:string}) => {
  const {name,email, password} = values
  auth.createUserWithEmailAndPassword(email,password)
  .then(({user})=>{
    console.log("creating user...")
    const timestamp = new Date();
    const userRoles = ["user"];
    user?.sendEmailVerification()
    firestore.collection("users").doc(user?.uid).set(
      {
        displayName:name,
        email,
        createdDate: timestamp,
        userRoles,
      }
    )
  })
}