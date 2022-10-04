import './App.css';
import Home from './components/Home.js'
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import Login from './components/Login';
import UserContext from './UserContext';
import { BrowserRouter as Router, Switch, Link, Redirect, Route, useHistory } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './components/Register';
import ServerError from './components/ServerError';
import About from './components/About';
import Game from './components/Game';
import Games from './components/GameList';
import GameForm from './components/AddGame';
import NotFound from './components/NotFound';
import PickUpForm from './components/AddPickUp';
import PickUpMapTesting from './components/PickUpMapTesting';
import AddUser from './components/AddUser';
import PickupList from './components/PickUpList';
import DeleteGame from './components/DeleteGame';
import DeletePickup from './components/DeletePickup';
import Profile from './components/Profile';
import LocationForm from './components/LocationForm';

const LOCALSTORAGE_KEY = 'gameFinderAppToken'

function App() {
  const [user, setUser] = useState(null);

  const history = useHistory();

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
    var answer = window.confirm("Are you sure you want to log out?");

    if(!answer){
      return null;
    }


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
              <Route path= {['/pickup/add', '/pickup/edit/:editId']}>
                <PickUpForm />
              </Route>
              <Route exact path="/game/delete/:deleteId">
                <DeleteGame/>
              </Route>
              <Route exact path='/pickup'>
                <PickupList />
              </Route>
              <Route exact path="/pickup/delete/:deleteId">
                <DeletePickup/>
              </Route>
              <Route exact path='/pickupmap'>
                <PickUpMapTesting />
              </Route>
              <Route exact path='/user/edit/:username'>
                <AddUser />
              </Route>
              <Route exact path = '/user'>
                <Profile />
                </Route>
              <Route exact path='/user/edit/:username'>
                <AddUser />
              </Route>
              <Route exact path='/location/add'>
                <LocationForm />
              </Route>
              <Route exact path="/errors">
                <ServerError />
              </Route>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
