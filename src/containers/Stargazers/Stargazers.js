import React, { Component, PropTypes } from 'react';
import { routeActions } from 'react-router-redux';
import { GithubExplorer } from 'components';
import { loadUserAndRepoStarredWithOption, loadRepoStarredWithOption } from 'redux/modules/stargazers';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/lib/circular-progress';

@asyncConnect([{
  deferred: true,
  promise: ({ params, store: { dispatch } }) => {
    if (params.username) {
      return dispatch(loadUserAndRepoStarredWithOption({
        username: params.username
      }));
    }
  }
}])
@connect(
  state => ({
    user: state.stargazers.userData,
    repo: state.stargazers.repoData,
    loading: state.stargazers.loading
  }),
  { loadUserAndRepoStarredWithOption, loadRepoStarredWithOption, pushState: routeActions.push }
  )
export default class Stargazers extends Component {
  static propTypes = {
    children: PropTypes.object,
    loadUserAndRepoStarredWithOption: PropTypes.func.isRequired,
    loadRepoStarredWithOption: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string
    }),
    user: PropTypes.object,
    repo: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  handleSubmitExplorerInput = (username) => {
    console.log(`entered ${username}`);
    this.props.pushState(`/stargazers/${username}`);
  };

  renderLoading = () => {
    if (this.props.loading) {
      return (
        <CircularProgress />
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <GithubExplorer
              username={this.props.params.username}
              onSubmitClicked={this.handleSubmitExplorerInput}
            />
          </div>
          <div className="col-md-1">
            {this.renderLoading()}
          </div>
        </div>
        {/* this will render the child routes only if we have user and repo props */}
        {
          this.props.children && this.props.repo && this.props.user &&
        React.cloneElement(this.props.children, {
          user: this.props.user,
          pagination: this.props.repo.pagination,
          repos: this.props.repo.repos,
          paginationChanged: this.props.loadRepoStarredWithOption
        })
        }
      </div>
    );
  }
}
