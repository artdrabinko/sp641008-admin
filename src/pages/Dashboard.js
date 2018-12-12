import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Categories } from "../pages/Categories";
import Orders from "../pages/Orders";
import Goods from "../pages/Goods";
import CreateGoods from "./CreateGoods";
import UpdateGoods from "./UpdateGoods";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import { readCategories } from "../ducks/categories";
import { readGoods } from "../ducks/goods";
import { readOrders } from "../ducks/orders";
import { links } from "../routes";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.readCategories();
    this.props.readGoods();
    this.props.readOrders();
  }

  render() {
    const { backButton } = this.props;
    const BTN = backButton.isVisible ? (
      <Link to={backButton.backLink} className="btn btn-primary btn-sm">
        Back
      </Link>
    ) : (
      ""
    );
    return (
      <Router>
        <div>
          <Header />
          <div className="container pt-3">
            <div className="row">
              <Sidebar />

              <div className="col-md-9 mb-3">
                <div className="row">
                  <div className="col-6">
                    <h5 className="mt-1 mb-0 font-weight-bold">
                      {this.props.dashboard.title}
                    </h5>
                  </div>
                  <div className="col-6 d-flex justify-content-end">{BTN}</div>
                </div>
                <hr />
                <Switch>
                  <Route exact path={"/"} component={Goods} />

                  <Route exact path={links.GOODS} component={Goods} />
                  <Route
                    exact
                    path={links.CREATE_GOODS}
                    component={CreateGoods}
                  />
                  <Route
                    exact
                    path={links.UPDATE_GOODS}
                    component={UpdateGoods}
                  />
                  <Route exact path={links.CATEGORIES} component={Categories} />
                  <Route
                    path={links.CREATE_CATEGORY}
                    component={CreateCategory}
                  />
                  <Route
                    path={links.UPDATE_CATEGORY}
                    component={UpdateCategory}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { backButton, dashboard } = state;
  return {
    backButton,
    dashboard
  };
}

export default connect(
  mapStateToProps,
  { readCategories, readGoods, readOrders }
)(Dashboard);
