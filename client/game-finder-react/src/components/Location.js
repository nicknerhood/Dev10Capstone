import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Location({ location }){
    const history = useHistory();

    const authManager = useContext(UserContext);
    
}