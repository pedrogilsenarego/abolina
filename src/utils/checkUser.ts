import { CurrentUser } from "../slicer/user/user.types";

 const checkUser = (currentUser:CurrentUser) => {
  if (!currentUser ) return false;
  return true;

  
};

export default checkUser