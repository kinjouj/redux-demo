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

/*
function mapStateToProps(state) {
  return state;
}
*/

export default connect(
  (state) => {
    return state;
  }
)(Echo);
