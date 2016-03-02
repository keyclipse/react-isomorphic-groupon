import React, {Component} from 'react';
import AppBar from 'material-ui/lib/app-bar';
/*
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
*/
/*
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';
*/

/*
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};
*/

/*
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: 'all',
});
*/

export default class Hello extends Component {

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
    /*
    const standardActions = (
      <FlatButton
        label="Okey"
        secondary
        onTouchTap={this.handleRequestClose}
      />
    );
    */


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
