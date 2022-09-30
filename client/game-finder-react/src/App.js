import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js'
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import Login from './components/Login';
import UserContext from './UserContext';
import { BrowserRouter as Router, Switch, Link, Redirect, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './components/Register';
import ServerError from './components/ServerError';
import About from './components/About';
import Game from './components/Game';
import Games from './components/GameList';
import GameForm from './components/AddGame';
import PickupForm from './components/AddPickUp';

const LOCALSTORAGE_KEY = 'gameFinderAppToken'

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwt_decode(token);

    localStorage.setItem(LOCALSTORAGE_KEY, token);

    const roles = decodedToken.authorities.split(',');

    const user = {
      username: decodedToken.sub,
      roles,
      token,
      hasRole: function(role) {
        return this.roles.includes(role);
      }
    }

    setUser(user);
  } 

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    setUser(null);
  }

  const authManager = {
    user: user ? {...user} : null,
    login,
    logout
  }

  useState(() => {
    const previouslySavedToken = localStorage.getItem(LOCALSTORAGE_KEY);
    if(previouslySavedToken){
      login(previouslySavedToken);
    }
  }, []);


  return (
    <div className='App'>
      <UserContext.Provider value={authManager} >
        <Router>
          <Nav />
          <div className='container'>
            <Switch>
              <Route path='/login'>
                {!user ? <Login /> :<Redirect to="/" />}
              </Route>
              <Route path='/register'>
                {!user ? <Register /> : <Redirect to="/" />}
              </Route>
              <Route path="/about">
                <About/>
              </Route>
              <Route exact path="/game">
                <Games/>
              </Route>
              <Route path={['/game/add', '/game/edit/:editId']}>
                <GameForm /> 
              </Route>
              <Route exact path='/pickup'>
              <PickupForm />
              </Route>
              <Route exact path="/errors">
                <ServerError />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>

          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
