import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const SignOutLinks = () => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link className="nav-link" to="/signin">
          Sign in
        </Link>
      </NavItem>
    </Nav>
  );
};

export default SignOutLinks;
