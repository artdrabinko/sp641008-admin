import React, { Component } from "react";
import { connect } from "react-redux";
import { TableCategories } from "../../components/Tables";
import { Link } from "react-router-dom";
import { links } from "../../routes";
import { hideBackButton } from "../../ducks/backButton";
import { setDashboardTitle } from "../../ducks/dashboard";
import {
  setCategoryFilter,
  resetCategoryFilter
} from "../../ducks/categoryFilter";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Categories",
      confirmDialog: false,
      filter: ""
    };
  }

  componentDidMount() {
    this.props.hideBackButton();
    this.props.setDashboardTitle(this.state.pageTitle);
  }

  componentWillUnmount() {
    this.props.resetCategoryFilter();
  }

  handlerInputSearch = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    this.props.setCategoryFilter(value);
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
            <Link to={links.CREATE_CATEGORY} className="btn btn-primary btn-sm">
              <i className="fa fa-plus-square" /> Add a category
            </Link>
          </div>
        </div>

        <TableCategories />
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
    setCategoryFilter,
    resetCategoryFilter
  }
)(Categories);
