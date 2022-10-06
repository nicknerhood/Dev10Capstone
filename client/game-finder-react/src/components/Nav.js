import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Nav() {
    const authManager = useContext(UserContext);



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                        <Link to="/pickup" className="nav-link">Pickups</Link>
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
                            (<><li className="nav-item">
                                <Link to="/user" className="nav-link">{authManager.user.username}</Link>
                            </li>
                            {/* <button type="button" className="btn btn-secondary" onClick={authManager.logout}>Logout</button> */}
                            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal">Logout</button>
                            
                            </>
                            )
                            
                            }
                            
                </ul>
                {authManager.user && <span className="navbar-text text-clear">{`Welcome ${authManager.user.username}`}</span>}


                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to log out?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={authManager.logout} data-dismiss="modal">Confirm</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;