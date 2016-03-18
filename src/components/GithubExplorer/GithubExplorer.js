
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';

export default class GithubExplorer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      username: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      explorerInput: props.params.username
    };
  }

  handleChangeInput = (event) => {
    this.setState({
      explorerInput: event.target.value
    });
  }

  handleOnEnterInput = (event) => {
    this.setState({
      explorerInput: ''
    });
    console.log(`entered ${event.target.value}`);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={this.state.explorerInput}
          onChange={this.handleChangeInput}
          onEnterKeyDown={this.handleOnEnterInput}
        />
      </div>
    );
  }

}
