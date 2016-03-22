
import React, { Component, PropTypes } from 'react';
import { GithubUser, GithubPagination, GithubRepo } from 'components';


export default class GithubUserAndRepo extends Component {

  static propTypes = {
    user: PropTypes.object,
    repos: PropTypes.array,
    pagination: PropTypes.object,
    paginationChanged: PropTypes.func
  };

  renderPagination(pagination) {
    if (pagination) {
      return (
        <GithubPagination
          pagination={pagination}
          onPagination={this.props.paginationChanged}
        />
      );
    }
  }

  renderRepos(repos) {
    return (
      repos.map(repo =>
        <div key={repo.full_name}
             className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 pure-u-xl-1-6">
          <GithubRepo repo={repo} />
        </div>
      )
    );
  }

  render() {
    const { user, repos, pagination } = this.props;

    return (
      <div>
        <GithubUser user={user}/>
        {this.renderPagination(pagination)}
        {this.renderRepos(repos)}
      </div>
    );
  }
}
