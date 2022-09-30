import { useHistory } from "react-router-dom";

function NotFound() {
    const history = useHistory();

    const id = history.location.state ? history.location.state.gameId : null;

    return(<>
    <h2>Not Found</h2>
    <p>{'That resource does not exist, sorry'}</p>
    </>)
}

export default NotFound;