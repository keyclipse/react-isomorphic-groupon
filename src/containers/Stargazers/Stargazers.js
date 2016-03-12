import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { load as loadStargazerUser } from 'redux/modules/stargazers';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    return dispatch(loadStargazerUser());
  }
}])
@connect(
  state => ({stargazers: state.stargazers.data}))
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
