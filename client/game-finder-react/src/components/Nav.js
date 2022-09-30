import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Nav() {
    const authManager = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <Link className="navbar-brand" to="/">GameFinder</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" src="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-brand" href="#">
                    <img src="../images/game-finder-icon.png" width="40" height="40" alt=""/>
                </li>
                <li className="nav-item">
                    <Link to="/game" className='nav-link'>Games</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className='nav-link'>About</Link>
                </li>
                    {!authManager.user ? (<>
                        <li className="nav-item">
                            <Link to="/login" className='nav-link'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </>):
                        <button type="button" className="btn btn-secondary" onClick={authManager.logout}>Logout</button>}
                </ul>
                {authManager.user && <span className="navbar-text text-success">{`Welcome ${authManager.user.username}`}</span>}
            </div>
        </nav>
    );
}

export default Nav;