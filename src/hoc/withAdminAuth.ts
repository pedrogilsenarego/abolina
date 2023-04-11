import  useAdminAuth  from "../hooks/useAdminAuth";

const WithAdminAuth = (props:any) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
