import React from "react";
import { connect } from "react-redux";

class Echo extends React.Component {

  render() {
    let { text } = this.props;

    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Echo);
