import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class EchoInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <input type="text" ref="input" onChange={(e) => this.onChange(e)} />
    );
  }

  onChange(event) {
    let text = this.refs.input.value;
    this.props.onChange(text);
  }

}

export default connect()(EchoInput);
