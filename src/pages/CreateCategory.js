import React, { Component } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { connect } from "react-redux";
import { firebaseDB } from "../firebase";
import { setBackButtonUrl } from "../ducks/backButton";
import { setDashboardTitle } from "../ducks/dashboard";
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../configToast";
import { links } from "../routes";

class CreateCategory extends Component {
  state = {
    pageTitle: "Create category",
    categoryName: "",
    isDisabled: true,
    errors: false,
    confirmDialog: false
  };

  componentDidMount() {
    this.props.setBackButtonUrl(links.CATEGORIES);
    this.props.setDashboardTitle(this.state.pageTitle);
  }
  closeDialog = () => {
    this.setState({
      confirmDialog: false
    });
  };

  handlerInputCategoryName = (e) => {
    const { value } = e.target;
    if (value.length >= 4) {
      this.setState({ categoryName: e.target.value, isDisabled: false });
    } else {
      this.setState({ categoryName: e.target.value, isDisabled: true });
    }
  };

  createNewCategory = () => {
    const { categoryName } = this.state;
    firebaseDB
      .ref("/categories")
      .push({
        categoryName
      })
      .then((res) => {
        toast.success(
          `Category ${categoryName} has been successfully created!`,
          configToast
        );
      })
      .catch((err) => {
        toast.error(
          `Category ${categoryName} has not been created!`,
          configToast
        );
      });
    this.setState({
      confirmDialog: false,
      categoryName: "",
      isDisabled: true
    });
  };

  handlerFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      confirmDialog: true
    });
  };

  render() {
    return (
      <form onSubmit={this.handlerFormSubmit}>
        <ToastContainer />
        <ConfirmDialog
          confirmTitle={"Create category"}
          confirmQuestion={`Do you really want to create category ${
            this.state.categoryName
          }?`}
          isVisible={this.state.confirmDialog}
          submitAction={this.createNewCategory.bind(this)}
          closeAction={this.closeDialog}
          confirmButtonClass={"success"}
          confirmButtonMessage={"Create new category"}
        />
        <label htmlFor="inputCategoryName">
          <b>Entry category name</b>
        </label>
        <div className="form-row col-md-12 p-0">
          <div className="form-group col-md-6">
            <input
              id="inputCategoryName"
              type="text"
              className="form-control"
              placeholder="Name"
              maxLength="20"
              onChange={this.handlerInputCategoryName}
              value={this.state.categoryName}
            />
            <div className="valid-feedback">Название свободно!</div>
            <div className="invalid-feedback">
              Такая категория уже существует!
            </div>
          </div>
          <div className="form-group col-md-4">
            <button
              className=" col-md-12 btn btn-success"
              type="submit"
              disabled={this.state.isDisabled}
            >
              Create category
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { setBackButtonUrl, setDashboardTitle }
)(CreateCategory);
