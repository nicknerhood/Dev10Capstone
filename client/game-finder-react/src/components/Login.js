import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useHistory, useLocation } from "react-router-dom";

import Errors from "./Errors";
import UserContext from "../UserContext";

const DEFAULT_LOGIN = {
    username: '',
    password: ''
}

function Login( { onSubmit} ) {

    const [login, setLogin] = useState(DEFAULT_LOGIN);
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const authManager = useContext(UserContext);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        };

        fetch('http://localhost:8080/authenticate', init)
            .then(resp => {
                switch (resp.status){
                    case 200:
                        return resp.json();
                    case 403:
                        setErrors(['The login information is incorrect']);
                        break;
                    default:
                        return Promise.reject('Something terrible happened');
                }
            })
            .then(body => authManager.login(body.jwt_token)) // HERE
            .catch(err => history.push('/errors', {errorMessage: err}));
    }

    const handleChange = (evt) => {
        const loginCopy = {...login};

        loginCopy[evt.target.name] = evt.target.value;

        setLogin(loginCopy);
    }

    return (
        <>
            <h2>Login</h2>
            {errors.length > 0 ? <Errors errors={errors} /> : null}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" className="form-control" id="username" value={login.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" className="form-control" id="password" value={login.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    );
}

export default Login;