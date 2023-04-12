import  useAuth  from "../hooks/useAuth"

interface Props {
  noAuth?:boolean
  children?:any
}

const WithAuth = (props:Props) => useAuth(props) && props.children;

export default WithAuth;
