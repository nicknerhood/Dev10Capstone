import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Errors from './Errors';


const DEFAULT_REGISTER = {
  username: '',
  password: '',
  confirmPassword: ''
}

function Register() {
  const [register, setRegister] = useState(DEFAULT_REGISTER)
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (register.password !== register.confirmPassword) {
      setErrors(['The passwords don\'t match']);
      return;
    }

    const registeration = {
      username: register.username,
      password: register.password
    };
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registeration)
    };

    fetch('http://localhost:8080/create_account', init)
    .then(resp => {
      switch (resp.status) {
        case 201:
            return resp.json();
        case 400:
          return resp.json();
        case 403:
          return ['Unable to register with this username and password combination'];
        default:
          return Promise.reject('Something terrible has happend');
      }
    })
    .then(body => {
      if (body && body.appUserId) {
        history.push('/login')
      } else {
        setErrors(body);
      }
    })
    .catch(err => history.push('/errors', {errorMessage: err}));
    
    
  }

  const handleChange = (evt) => {
    const registerCopy = {...register};

    registerCopy[evt.target.name] = evt.target.value;

    setRegister(registerCopy);
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">Register</h1>
      {errors.length > 0 ? <Errors errors={errors} /> : null}
      <div className="col-3 border m-4 mx-auto justify-self-center text-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input name="username" type="text" className="form-control" id="username" value={register.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className="form-control" id="password" value={register.password} onChange={handleChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input name="confirmPassword" type="password" className="form-control" id="confirmPassword" value={register.confirmPassword} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary m-2 mx-auto">Register</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Register;