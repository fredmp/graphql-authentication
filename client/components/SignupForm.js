import React from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';
import signupMutation from '../mutations/signup';
import currentUser from '../queries/currentUser';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // this.props - old set of props
    // nextProps  - new set of props that will be displayed when it re-renders
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetechQueries: [{ query: currentUser }]
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

export default graphql(signupMutation)(
  graphql(currentUser)(SignupForm)
);
