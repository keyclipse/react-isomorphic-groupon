import React, { Component, PropTypes } from 'react';
import { GithubExplorer } from 'components';
import { isLoaded, load as loadStargazerUser } from 'redux/modules/stargazers';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

@asyncConnect([{
  deferred: true,
  promise: ({ params, store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(loadStargazerUser(params.username));
    }
  }
}])
@connect(
  null,
  { loadStargazerUser }
  )
export default class Stargazers extends Component {
  static propTypes = {
    children: PropTypes.object,
    loadStargazerUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string
    })
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  handleSubmitExplorerInput = (username) => {
    console.log(`entered ${username}`);
    this.context.history.pushState({}, `/stargazers/${username}`);
    this.props.loadStargazerUser(username);
  }

  render() {
    return (
      <div>
        <GithubExplorer
          username={this.props.params.username}
          onSubmitClicked={this.handleSubmitExplorerInput}
        />
        {/* this will render the child routes */}
        {this.props.children &&
        React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}
