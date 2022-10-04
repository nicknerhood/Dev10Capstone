import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";

function Location({ location }){
    const history = useHistory();

    const authManager = useContext(UserContext);

    const handleDelete = () => {
        history.push(`/location/delete/${location.locationId}`);
    }

    const handleEdit = () => {
        history.push(`/location/edit/${location.locationId}`);
    }
}