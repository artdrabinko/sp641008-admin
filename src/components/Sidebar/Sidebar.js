import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { links } from "../../routes";

const arrLinks = [
  {
    name: "Goods",
    link: "/goods"
  },
  {
    name: "Categories",
    link: "/categories"
  }
];

class Sidebar extends Component {
  state = {
    selectedLinkNumber: 0
  };

  setNumberSelectetLink = (linkNumber) => {
    this.setState({
      selectedLinkNumber: linkNumber
    });
  };

  renderLinks = () => {
    return arrLinks.map((item, index) => {
      const addSelectStyle =
        this.state.selectedLinkNumber === index ? "selected" : "";

      return (
        <Link
          to={item.link}
          key={index}
          className={"list-group-item " + addSelectStyle}
          onClick={() => {
            this.setNumberSelectetLink(index);
          }}
        >
          {item.name}
        </Link>
      );
    });
  };

  render() {
    return (
      <aside className="col-md-3 mb-3">
        <div className="list-group">
          <h5 className="list-group-item">Menu</h5>
          {this.renderLinks()}
        </div>
      </aside>
    );
  }
}

export default connect(
  null,
  null
)(Sidebar);

/**
 * 
 * <Link to={links.ORDERS} className="list-group-item selected">
            Orders{" "}
            <span className="ml-1 badge badge-primary badge-pill">2</span>
          </Link>
 *  <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          <h3>Menu</h3>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to={links.ORDERS}>
              <Icon type="user" />
              <span>Orders</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to={links.PRODUCTS}>
              <Icon type="video-camera" />
              <span>Goods</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={links.CATEGORIES}>
              <Icon type="upload" />
              <span>Categories</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
 */
