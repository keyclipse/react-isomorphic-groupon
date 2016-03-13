import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { load as loadStargazerUser } from 'redux/modules/stargazers';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadStargazerUser('keyclipse'));
  }
}])
@connect(
  state => ({stargazers: state.stargazers.data})
)
export default class InfoBar extends Component {
  static propTypes = {
    stargazers: PropTypes.object
  }

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    );
  }
}
