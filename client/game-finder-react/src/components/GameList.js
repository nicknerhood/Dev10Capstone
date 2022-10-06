import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../gameList.css'
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

    const filteredGames = games.filter(game => game.genre.toLowerCase()==(search.toLowerCase()));
    setGames(filteredGames);
  }

  function handleCancel(){
    setGames(allGames);
  }







  return (
    <>
      <h1>Game Library</h1>
     
     <button type="button" className="btn btn-primary mt-4 mb-2" onClick={handleAddGame}>Add Game</button>
     <form onSubmit={handleSubmit} className="m-5">
                <div className="input-group">
                    <input id="search-box" type="search" className="form-control rounded" placeholder="Search by Game Name" aria-label="Search" aria-describedby="search-addon" />
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                    <button type="button" className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            {SearchedGames != games &&
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Games</th>
            <th scope="col">Short Description</th>
            <th scope="col">Genre/Type</th>
            {/* <th scope="col">Image</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => <Game key={game.id} game={game} />)}
        </tbody>
      </table>
    }
    <div>
      <br></br>
      <br></br>
    </div>
    </>
  )
}

export default Games;