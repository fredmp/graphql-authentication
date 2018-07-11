import React from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import loginMutation from '../mutations/login';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm />
      </div>
    );
  }
}

export default graphql(loginMutation)(LoginForm);
