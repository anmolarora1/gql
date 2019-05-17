import React, { useState } from 'react';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';
import CreateUserMutation from '../mutations/CreateUserMutation';
import SigninUserMutation from '../mutations/SigninUserMutation';

function Login(props) {
  const userInitDetails = { email: '', password: '', name: '' };
  const [loginState, setLoginState] = useState(true);
  const [userDetails, updateUserDetails] = useState(userInitDetails);

  const _confirm = () => {
    const { name, email, password } = userDetails;
    if (loginState) {
      SigninUserMutation(email, password, (id, token) => {
        _saveUserData(id, token);
        props.history.push(`/`);
      });
    } else {
      CreateUserMutation(name, email, password, (id, token) => {
        _saveUserData(id, token);
        props.history.push(`/`);
      });
    }
  };

  const _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  };

  const setUserDetails = (key, value) => {
    updateUserDetails({ ...userDetails, [key]: value });
  };

  return (
    <div>
      <h4 className="mv3">{loginState ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!loginState && (
          <input
            value={userDetails.name}
            onChange={e => setUserDetails('name', e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={userDetails.email}
          onChange={e => setUserDetails('email', e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={userDetails.password}
          onChange={e => setUserDetails('password', e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={() => _confirm()}>
          {loginState ? 'login' : 'create Account'}
        </div>
        <div
          className="pointer button"
          onClick={() => setLoginState(!loginState)}
        >
          {loginState
            ? 'need to create an account?'
            : 'already have an account?'}
        </div>
      </div>
    </div>
  );
}

export default Login;
