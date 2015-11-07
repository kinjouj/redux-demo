import React, { Component } from "react";
import { connect } from "react-redux";

class Echo extends Component {

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
