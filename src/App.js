import React, { Component } from "react";
import { LoadingComponent } from "./components/LoadingComponent";
import { renderRoutes } from "react-router-config";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    const {
      route: { routes }
    } = this.props;

    return (
      <LoadingComponent>
        <div>{renderRoutes(routes)}</div>
      </LoadingComponent>
    );
  }
}

export default App;
