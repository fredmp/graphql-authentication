import React from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import loginMutation from '../mutations/login';
import currentUser from '../queries/currentUser';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }]
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(loginMutation)(LoginForm);
