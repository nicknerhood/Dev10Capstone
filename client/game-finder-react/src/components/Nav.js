import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import UserContext from '../UserContext';

function Nav() {

//   const authManager = useContext(UserContext);

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark">
      <Link className='navbar-brand' to="/">Game</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/about" className='nav-link'>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/game" className='nav-link'>Games</Link>
          </li>
           <>
              <li className="nav-item">
                <Link to="/login" className='nav-link'>Login</Link>
              </li> 
              <li className="nav-item">
                <Link to="/register" className='nav-link'>Register</Link>
              </li>
            </>: 
            <button type="button" className="btn btn-secondary" >Logout</button>
        </ul>
      </div>
     <span className="navbar-text">{`Welcome `}</span>
    </nav>
  );
}

export default Nav;