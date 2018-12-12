import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignOutLinks from "./SignOutLinks";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { user } = this.props;
    const links = user ? null : null;
    const { isOpen } = this.state;
    return (
      <header>
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Dashboard
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              {links}
            </Collapse>
          </div>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
