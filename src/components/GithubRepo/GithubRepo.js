import React, { PropTypes } from 'react';

export default class GithubRepo extends React.Component {

  static propTypes = {
    repo: PropTypes.object.isRequired
  };

  render() {
    const { repo } = this.props;

    return (
      <div>
        <div className="ellipsis">
          <i className="fa fa-angle-double-right"></i>
          {' ' + repo.name}
        </div>
      </div>
    );
  }
}
