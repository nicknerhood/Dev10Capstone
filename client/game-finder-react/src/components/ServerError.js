import { useHistory } from "react-router-dom";

function ServerError() {
    const history = useHistory();

    const errorMessage = history.location.state ? history.location.state.errorMessage : null;

    return(
        <div className="server alert alert-warning mt-3">
            <h2>Big error</h2>
            {errorMessage && (<div className="alert alert-danger">{`${errorMessage}`}</div>)}
        </div>
    );
}

export default ServerError;