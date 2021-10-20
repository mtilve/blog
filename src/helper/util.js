
import { useHistory } from "react-router";

export function BackLoginPage() {
    const history = useHistory();
    let token = localStorage.getItem('Token');
    
    if (!token){
        localStorage.removeItem("Token");
        history.push({pathname: "/"});
      return <></>;
    }
}