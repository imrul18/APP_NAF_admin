import { Navigate,useLocation } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
    let {pathname} = useLocation()
    // let module = pathname.split('/').slice(-1).pop()

    const auth = JSON.parse(localStorage.getItem("user"));
    return auth?.access_token ? children : <Navigate to="/" />;
  };