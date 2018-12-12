import React, { Component } from "react";
import { connect } from "react-redux";
import { TableOrders } from "../components/Tables";
import { setOrdersFilter, resetOrdersFilter } from "../ducks/ordersFilter";
import { setDashboardTitle } from "../ducks/dashboard";
import { hideBackButton } from "../ducks/backButton";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Orders",
      confirmDialog: false,
      filter: ""
    };
  }

  componentDidMount() {
    this.props.hideBackButton();
    this.props.setDashboardTitle(this.state.pageTitle);
  }

  componentWillUnmount() {
    this.props.resetOrdersFilter();
  }

  handlerInputSearch = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    this.props.setOrdersFilter(value);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-group-sm col-6 d-flex mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={this.handlerInputSearch}
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary btn-sm" type="button">
                <i className="fa fa-search" />
              </button>
            </span>
          </div>

          <div className="form-group col-6 d-flex justify-content-end " />
        </div>

        <TableOrders history={this.props.history} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories } = state;
  return {
    categories
  };
}

export default connect(
  mapStateToProps,
  {
    hideBackButton,
    setDashboardTitle,
    setOrdersFilter,
    resetOrdersFilter
  }
)(Orders);
