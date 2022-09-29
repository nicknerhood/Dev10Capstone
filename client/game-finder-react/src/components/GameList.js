import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import UserContext from '../UserContext';

import Game from './Game';

function Games() {
  const [games, setGames] = useState([]);

 const [SearchedGames, setSearchedGames] = useState([]);
 const [allGames, setAllGames] = useState([])

  const history = useHistory();
  
  




  useEffect(() => {
    fetch('http://localhost:8080/game')
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong.  Oh god the humanity!!!');
    })
    .then(data => {
      setGames(data);
      setAllGames(data)
      
    })
    .catch(err => history.push('/error', {errorMessage: err}));
  },[])
  function handleAddGame(){
    return history.push('/game/add')
  }

  function handleSubmit(search, evt){
    search.preventDefault();
    search = document.getElementById("search-box").value;

    const filteredGames = games.filter(game => game.genre.toLowerCase().includes(search));
    setGames(filteredGames);
  }

  function handleCancel(){
    setGames(allGames);
  }







  return (
    <>
      <h2>Games</h2>
     
     <button type="button" className="btn btn-primary mb-3" onClick={handleAddGame}>Add Game</button>
     <form onSubmit={handleSubmit} className="m-5">
                <div className="input-group">
                    <input id="search-box" type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            {SearchedGames != games &&
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Game Info</th>
            <th scope="col">Genre</th>
            <th scope="col">Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => <Game key={game.id} game={game} />)}
        </tbody>
      </table>
}
    </>
  )
}

export default Games;