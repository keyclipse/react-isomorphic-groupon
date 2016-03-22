import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class GithubPagination extends React.Component {

  static propTypes = {
    onPagination: PropTypes.func,
    pagination: PropTypes.object
  };

  handlePaginationClick(link) {
    const page = link.url;
    this.props.onPagination({ page });
  }

  render() {
    const { pagination } = this.props;
    if (!pagination) return null;
    const styles = require('./GithubPagination.scss');

    const iconMap = {
      first: 'fa fa-fast-backward',
      prev: 'fa fa-backward',
      next: 'fa fa-forward',
      last: 'fa fa-fast-forward'
    };

    return (
      <div className={styles.pagination}>
        <ul>
          {[ 'first', 'prev', 'next', 'last' ].map((key, index) =>
            <li key={index}>
              {pagination[key] ?
                <span onClick={this.handlePaginationClick.bind(
                this, pagination[key])}>
                <i className={iconMap[key]}></i>
              </span>
                : <span className={classnames(iconMap[key], styles.disabled)}></span>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}
