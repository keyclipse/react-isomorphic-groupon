import React, { Component, PropTypes } from 'react';
import { routeActions } from 'react-router-redux';
import { GithubExplorer } from 'components';
import { isLoaded, loadRepoStarredWithOption } from 'redux/modules/stargazers';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

@asyncConnect([{
  deferred: true,
  promise: ({ params, store: { dispatch, getState } }) => {
    if (!isLoaded(getState()) && params.username) {
      return dispatch(loadRepoStarredWithOption({
        username: params.username
      }));
    }
  }
}])
@connect(
  state => ({
    user: state.stargazers.userData,
    repo: state.stargazers.repoData
  }),
  { loadRepoStarredWithOption, pushState: routeActions.push }
  )
export default class Stargazers extends Component {
  static propTypes = {
    children: PropTypes.object,
    loadRepoStarredWithOption: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string
    }),
    user: PropTypes.object,
    repo: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  handleSubmitExplorerInput = (username) => {
    console.log(`entered ${username}`);
    this.props.pushState(`/stargazers/${username}`);
    this.props.loadRepoStarredWithOption({
      username
    });
  }

  render() {
    return (
      <div>
        <GithubExplorer
          username={this.props.params.username}
          onSubmitClicked={this.handleSubmitExplorerInput}
        />
        {/* this will render the child routes only if we have user props */}
        {
          this.props.children && this.props.user &&
        React.cloneElement(this.props.children, { user: this.props.user })
        }
      </div>
    );
  }
}
