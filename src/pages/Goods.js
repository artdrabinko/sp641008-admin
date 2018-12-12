import React, { Component } from "react";
import { connect } from "react-redux";
import { TableGoods } from "../components/Tables";
import { Link } from "react-router-dom";
import { links } from "../routes";
import { setGoodsFilter, resetGoodsFilter } from "../ducks/goodsFilter";
import { setDashboardTitle } from "../ducks/dashboard";
import { hideBackButton } from "../ducks/backButton";

class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Goods",
      confirmDialog: false,
      filter: ""
    };
  }

  componentDidMount() {
    this.props.hideBackButton();
    this.props.setDashboardTitle(this.state.pageTitle);
  }

  componentWillUnmount() {
    this.props.resetGoodsFilter();
  }

  handlerInputSearch = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    this.props.setGoodsFilter(value);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="input-group-sm col-6 d-flex">
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

          <div className="form-group col-6 d-flex justify-content-end ">
            <Link to={links.CREATE_GOODS} className="btn btn-primary btn-sm">
              <i className="fa fa-plus-square" /> Add a goods
            </Link>
          </div>
        </div>

        <TableGoods history={this.props.history} />
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
    setGoodsFilter,
    resetGoodsFilter
  }
)(Goods);
