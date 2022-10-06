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
import MapWithModal from './components/MapWithModal';

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
    // var answer = window.confirm("Are you sure you want to log out?");

    // if(!answer){
    //   return null;
    // }


    localStorage.removeItem(LOCALSTORAGE_KEY);
    setUser(null);

    //history.push('/login');
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
                {!user  ? <Register /> : <Redirect to="/" />}
              </Route>
              <Route path="/about">
                {user ? <About /> :<Redirect to="/login" />}
              </Route>
              <Route exact path="/game">
                {user ? <Games /> :<Redirect to="/login" />}
              </Route>
              <Route path={['/game/add', '/game/edit/:editId']}>
                {user ? <GameForm /> :<Redirect to="/login" />}
              </Route>
              <Route path= {['/pickup/add', '/pickup/edit/:editId']}>
                {user ? <PickUpForm /> :<Redirect to="/login" />}
              </Route>
              <Route exact path="/game/delete/:deleteId">
                {user ? <DeleteGame /> :<Redirect to="/login" />}
              </Route>
              <Route exact path='/pickup'>
                {user  ? <PickupList /> :<Redirect to="/login" />}
              </Route>
              <Route exact path="/pickup/delete/:deleteId">
                {user && user.hasRole("ROLE_ADMIN") ? <DeletePickup /> :<Redirect to="/login" />}
              </Route>
              <Route exact path='/pickupmap'>
                {user ? <MapWithModal /> :<Redirect to="/login" />}
              </Route>
              <Route  path={['/user/edit/:editId', '/user/add']}>
                {user ? <AddUser /> :<Redirect to="/login" />}
              </Route>
              <Route exact path = '/user'>
                {user ? <Profile /> :<Redirect to="/login" />}
              </Route>
              <Route exact path='/location'>
                {user ? <LocationForm /> :<Redirect to="/login" />}
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

          <footer className='footer text-center text-lg-start bg-info fixed-bottom'>
            <div className='text-center p-3'>2022 Copyright: Game-Finder</div>
          </footer>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
