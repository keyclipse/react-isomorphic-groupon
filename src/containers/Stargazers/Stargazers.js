import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class Stargazers extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
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
