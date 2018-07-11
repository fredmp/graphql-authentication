import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import currentUserQuery from '../queries/currentUser';
import logoutMutation from '../mutations/logout';

class Header extends React.Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{ query: currentUserQuery }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) { return <div/>; }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogout.bind(this)}>Logout</a>
        </li>
      );
    }
    return (
      <div>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logoutMutation)(
  graphql(currentUserQuery)(Header)
);
