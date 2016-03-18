import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
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


export default class InfoBar extends Component {
  static propTypes = {
    stargazers: PropTypes.object
  }

  state = {
    stargazersInput: ''
  }

  handleChangeInputStargazers = (event) => {
    this.setState({
      stargazersInput: event.target.value
    });
  }

  handleOnEnterInputStargzers = (event) => {
    this.setState({
      stargazersInput: ''
    });
    console.log(`entered ${event.target.value}`);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={this.state.stargazersInput}
          onChange={this.handleChangeInputStargazers}
          onEnterKeyDown={this.handleOnEnterInputStargzers}
        />
      </div>
    );
  }
}
