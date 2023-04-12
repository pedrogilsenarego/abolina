import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { State } from "../slicer/types";
import { CurrentUser } from "../slicer/user/user.types";
import { ROUTE_PATHS } from "../constants/routes";
import checkUser from "../utils/checkUser";

interface Props {
  noAuth?:boolean
}

const useAuth = (props:Props) => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );
	
	const navigate = useNavigate();
	useEffect(
		() => {
      if(props.noAuth) {
        if (checkUser(currentUser)) {
          navigate(ROUTE_PATHS.HOME);
        }
        
      }
      else if (!checkUser(currentUser)) {
        navigate(ROUTE_PATHS.HOME);
      }
			
		},
		// eslint-disable-next-line
		[currentUser]
	);
	return props.noAuth? true:currentUser;
};

export default useAuth;
