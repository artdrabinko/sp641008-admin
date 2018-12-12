import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseDB } from "../firebase";
import { links } from "../routes";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import { setBackButtonUrl } from "../ducks/backButton";
import { setDashboardTitle } from "../ducks/dashboard";
import { configToast } from "../configToast";

class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Update category",
      categoryId: "",
      categoryName: "",
      isButtonDisabled: true,
      confirmDialog: false
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCategoryName = this.changeCategoryName.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const categoryId = this.props.match.params.id;

    const selectedCategory = this.props.categories.items.find((item) => {
      if (item.id === categoryId) {
        return item;
      } else {
        return false;
      }
    });

    if (!selectedCategory) {
      this.props.history.push(links.CATEGORIES);
    }

    this.setState({
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.categoryName
    });
  }

  componentDidMount() {
    this.props.setBackButtonUrl(links.CATEGORIES);
    this.props.setDashboardTitle(this.state.pageTitle);
  }

  handlerInputCategoryName = (e) => {
    const categoryName = e.target.value;
    if (categoryName === "" || categoryName.length < 5) {
      this.setState({
        categoryName,
        isButtonDisabled: true
      });
    } else {
      this.setState({
        categoryName,
        isButtonDisabled: false
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isButtonDisabled: true,
      confirmDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      confirmDialog: false,
      isButtonDisabled: false
    });
  };

  confirmDialog = () => {
    this.setState({
      confirmDialog: false,
      isButtonDisabled: true
    });
  };

  changeCategoryName = () => {
    console.log(this.state);
    const { categoryId, categoryName } = this.state;
    firebaseDB.ref("categories/" + categoryId).set(
      {
        categoryName
      },
      function(error) {
        if (error) {
          toast.error(
            `Category ${categoryName} has not been updated!`,
            configToast
          );
        } else {
          toast.success(
            `Category ${categoryName} has been successfully updated!`,
            configToast
          );
        }
      }
    );
    this.confirmDialog();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ToastContainer />
        <ConfirmDialog
          confirmTitle={"Update category"}
          confirmQuestion={`Do you really want to update category ${
            this.state.categoryName
          }?`}
          isVisible={this.state.confirmDialog}
          submitAction={this.changeCategoryName}
          closeAction={this.closeDialog}
          confirmButtonClass={"primary"}
          confirmButtonMessage={"Update"}
        />
        <label htmlFor="exampleInputEmail1">
          <b>Entry category name</b>
        </label>
        <div className="form-row col-md-12 p-0">
          <div className="form-group col-md-6">
            <input
              id="in_group_name_menu_2"
              type="text"
              className="form-control"
              placeholder="Category"
              maxLength="20"
              value={this.state.categoryName}
              onChange={this.handlerInputCategoryName}
            />
            <div className="valid-feedback">Название свободно!</div>
            <div className="invalid-feedback">
              Такая категория уже существует!
            </div>
          </div>
          <div className="form-group col-md-4">
            <button
              id="btn_form_menu_2"
              className=" col-md-12 btn btn-outline-info"
              type="submit"
              disabled={this.state.isButtonDisabled}
            >
              Update changes
            </button>
          </div>
        </div>
      </form>
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
  { setBackButtonUrl, setDashboardTitle }
)(UpdateCategory);
