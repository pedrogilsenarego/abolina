import { CurrentUser } from "../slicer/user/user.types";

 const checkUserIsAdmin = (currentUser:CurrentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;

  return false;
};

export default checkUserIsAdmin