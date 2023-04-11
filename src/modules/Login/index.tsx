import { Button } from "@mui/material"
import { FcGoogle } from "react-icons/fc";
import { i18n } from "../../translations/i18n";
import { useDispatch } from "react-redux";
import { googleSignInStart } from "../../slicer/user/user.actions";

const Login = () => {
  const dispatch = useDispatch()

  const handleGoogleSigniIn = () => {
    dispatch(googleSignInStart());

  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: window.innerHeight }}>
      <Button
        onClick={handleGoogleSigniIn}
        variant={"contained"}
        fullWidth={true}
        style={{
          backgroundColor: "#4285F4",
          color: "#FFFFFF",
          maxWidth: "500px",
        }}
      >
        <FcGoogle size={"2em"} /> &nbsp;{i18n.t("modules.login.google")}
      </Button>

    </div>
  )
}

export default Login