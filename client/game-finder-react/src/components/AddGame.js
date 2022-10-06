import { useEffect, useState } from 'react';



import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../UserContext';
import Errors from './Errors';
import { useContext } from 'react';

const DEFAULT_GAME = { title: '', imagePath: '', gameInfo: '', genre: ''}


function GameForm() {

    

  const [game, setGame] = useState(DEFAULT_GAME);
  const [errors, setErrors] = useState([]);

  const authManager = useContext(UserContext)

  

  const { editId } = useParams();
  const history = useHistory();


  useEffect(() => {
    if (editId) {
      fetch(`http://localhost:8080/game/${editId}`)
        .then(resp => {
          switch(resp.status) {
            case 200:
              return resp.json();
            case 404:
              history.push('/not-found', { id: editId })
              break;
            default:
              return Promise.reject('Something terrible has gone wrong');
          }
        })
        .then(body => {
          if (body) {
            setGame(body);
          }
        })
        .catch(err => history.push('/errors', {errorMessage: err}));
    }

  }, [])

  const saveGame = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authManager.user.token}`

      },
      body: JSON.stringify({...game})
    };

    fetch('http://localhost:8080/game', init)
    .then(resp => {
      if (resp.status === 201 || resp.status === 400) {
        return resp.json();
      }
      return Promise.reject('Something terrible has gone wrong');
    })
    .then(body => {
      if (body.gameId) {
        history.push('/game')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const updateGame = () => {
    const updateGame = {id: editId, ...game};

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authManager.user.token}`

      },
      body: JSON.stringify(updateGame)
    };

    fetch(`http://localhost:8080/game/${editId}`, init)
    .then(resp => {
      switch (resp.status) {
        case 204:
          return null;
        case 400:
          return resp.json();
        case 404:
          history.push('/not-found', { id: editId });
          break;
        default:
          return Promise.reject('Something terrible has gone wrong');

      }
    })
    .then(body => {
      if (!body) {
        history.push('/game')
      } else if (body) {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    const fetchFunction = editId > 0 ? updateGame : saveGame;

    fetchFunction();

  }

  const handleChange = (evt) => {


   
    const newGame = {...game};

    newGame[evt.target.name] = evt.target.value;

    setGame(newGame);


   
  }

  const handleCancel = () => history.push('/game')


  return (
    <>
      <h2>{editId ? 'Update' : 'Add'} Game</h2>
      {errors.length > 0 ? <Errors errors={errors} /> : null}
      <form className='edit-form' onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input name="title" type="text" className="form-control" id="title" value={game.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="gameInfo">Description: </label>
          <input name="gameInfo" type="text" className="form-control" id="gameInfo" value={game.gameInfo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre/Type</label>
          <input name="genre" type="text" className="form-control" id="genre" value={game.genre} onChange={handleChange} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="imagePath">Image Path:</label>
          <input name="imagePath" type="text" className="form-control" id="imagePath" value={game.imagePath} onChange={handleChange} />
        </div> */}
        <div className="form-group">
          <button type="submit" className="btn btn-success mr-3">Submit</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default GameForm;