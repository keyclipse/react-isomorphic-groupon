import React, { Component } from 'react';
import { GithubExplorer } from 'components';
// import { load as loadStargazerUser } from 'redux/modules/stargazers';

/*
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadStargazerUser('keyclipse'));
  }
}])
@connect(
  state => ({stargazers: state.stargazers.data})
)
*/


export default class Stargazers extends Component {
  render() {
    return (
      <div>
        <GithubExplorer {...this.props} />
      </div>
    );
  }
}
