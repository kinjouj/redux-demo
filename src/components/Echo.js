import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

class Echo extends Component {

  static propTypes = {
    text: PropTypes.string
  }

  render() {
    let { text } = this.props;

    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }

}

export default connect()(Echo);
