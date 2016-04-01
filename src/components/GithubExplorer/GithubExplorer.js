
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';

export default class GithubExplorer extends Component {
  static propTypes = {
    onSubmitClicked: PropTypes.func.isRequired,
    username: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      explorerInput: props.username
    };
  }

  handleChangeInput = (event) => {
    this.setState({
      explorerInput: event.target.value
    });
  }

  handleOnEnterInput = (event) => {
    this.props.onSubmitClicked(event.target.value);
  }

  render() {
    return (
      <div>
        TESTTT
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
