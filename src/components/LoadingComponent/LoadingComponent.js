import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";

class LoadingComponent extends Component {
  componentWillMount() {
    console.log(this.props);
    this.props.getUser();
    const { isLoading } = this.props;
    if (isLoading === true) {
      this.props.getUser();
    }
  }

  render() {
    const { isLoading, user, children } = this.props;

    if (!isLoading || user !== null) {
      return <div>{children}</div>;
    } else {
      return (
        <div id="preloader">
          <div id="loader" />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { user, isLoading } = state;
  return {
    isLoading,
    user
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(LoadingComponent);
