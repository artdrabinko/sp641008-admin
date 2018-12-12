import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { signOut } from "../../actions/userActions";

const SignedInLinks = (props) => {
  const signOut = () => {
    //eslint-disable-next-line
    let result = confirm("Are you sure ?");

    if (result) {
      //props.signOut();
    }
  };

  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <button className="btn btn-outline-danger" onClick={signOut}>
          Sign out
        </button>
      </NavItem>
    </Nav>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  null
)(SignedInLinks);
