import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useHistory, useLocation } from "react-router-dom";

import Errors from "./Errors";
import UserContext from "../UserContext";

function Login( { onSubmit} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const authManager = useContext(UserContext);

    const handleSubmit =  async (evt) => {
        evt.preventDefault();

        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password,}),
        });

        if(response.status === 200){
            const {jwt_token} = await response.json();
            authManager.login(jwt_token);
            history.push("/");
        }else if(response.status === 403){
            setErrors(["Login failed"]);
        }else{
            setErrors(["Unknown Error"]);
        }
    }

    const handleClick = () => {
        history.push("/register");
      }
    
      return (
        <div>
         <h1 className="text-center">Login</h1>
         {errors.length > 0 ? <Errors errors={errors} /> : null}
         <div className="col-3 border m-4 mx-auto d-flex justify-self-center text-center">
          <form  onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                id="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                id="password"
              />
            </div>
            <div>
              <button className="btn btn-primary m-2 mx-auto" type="submit">Login</button>
            </div>
          </form>
         </div>
         <p className="text-center">New to Game-Finder?</p>
         <div>
              <button className="btn btn-primary m-2 mx-auto d-flex justify-self-center"
              onClick={handleClick}>
                Register
              </button>
         </div>
        </div>
      );
    }

export default Login;