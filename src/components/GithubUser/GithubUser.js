
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(
  state => ({user: state.stargazers.data})
)
export default class GithubUser extends Component {

  static propTypes = {
    user: PropTypes.object.required
  };


  renderUser(user) {
    return (
      <div className="content">
        <div className="section-user">
          <Link to={`/stargazers/${user.login}`}>
            <img src={user.avatar_url} width="144" height="144"
                 style={{ borderRadius: '200px' }} />
            <p>
              {user.login}
              {' '}
              <small>{user.name && <span>({user.name})</span>}</small>
            </p>
          </Link>
          <p className="link">
            <a href={user.html_url} target="_blank">
              <i className="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        {this.renderUser(user)}
      </div>
    );
  }
}
