import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TweetsLoaderAPI from './TweetsLoaderAPI';

const Register = () => {
  
  let history = useHistory();

  //state for controlling registration process
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  //registration function
  const register = async (e) => {
    e.preventDefault(); //prevent page from refreshing
    try {
        const response = await TweetsLoaderAPI.post(`/register`, {
            usernameRegister,
            passwordRegister
        });
        
    } catch (err) {
        console.error(err.message);
    }
    history.push("/")
}


  return (
    <div className="w-50 p-5 mx-auto">
      <div className="registration p-5"> 
        <form className='shadow-lg p-5 mb-5 bg-white rounded '>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email"
              onChange={(e) => {setUsernameRegister(e.target.value)}}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email" />

          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"
            onChange={(e) => {setPasswordRegister(e.target.value)}}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password" />
          </div>
          
          <button type="submit"
            onClick={register}
            className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;