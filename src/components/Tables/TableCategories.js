import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseDB } from "../../firebase";
import { Link } from "react-router-dom";
import { links } from "../../routes";
import { ConfirmDialog } from "../ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";

class TableCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: null,
      confirmDialog: false
    };

    this.setSelectedCategry = this.setSelectedCategry.bind(this);
    this.removeSelectedCategory = this.removeSelectedCategory.bind(this);
  }

  closeDialog = () => {
    this.setState({
      confirmDialog: false
    });
  };

  setSelectedCategry = (categoryItem) => {
    this.setState({
      selectedCategory: categoryItem,
      confirmDialog: true
    });
  };

  removeSelectedCategory = () => {
    const { id } = this.state.selectedCategory;
    firebaseDB.ref("categories/" + id).set(null, function(error) {
      if (error) {
        // The write failed...
        alert("The write failed...", error);
      } else {
        // Data saved successfully!
        toast.warning("Category  successfully deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    });
    this.closeDialog();
  };

  renderRows = () => {
    const { items } = this.props.categories;
    return items.map((item) => {
      const { id, categoryName } = item;
      const filter = this.props.categoryFilter.filter.toLowerCase();
      if (item.categoryName.toLowerCase().includes(filter)) {
        return (
          <tr key={id}>
            <td>{categoryName}</td>
            <td>
              <Link
                className="btn btn-info btn-sm table-btn mr-2"
                to={`${links.CATEGORIES}/${id}`}
              >
                <i className="fa fa-pencil-square-o fa-lg" /> Edit
              </Link>
              <button
                className="btn btn-danger btn-sm table-btn"
                onClick={() => {
                  this.setSelectedCategry(item);
                }}
              >
                <i className="fa fa-trash-o fa-lg" /> Delete
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <ConfirmDialog
          confirmTitle={"Delete category"}
          confirmQuestion={"Do you really want to delete category?"}
          isVisible={this.state.confirmDialog}
          submitAction={this.removeSelectedCategory}
          closeAction={this.closeDialog}
          confirmButtonClass={"danger"}
          confirmButtonMessage={"Delete"}
        />
        <table className="table table-hover table-bordered">
          <thead className="card-header">
            <tr>
              <th scope="col">Category name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="card-body">{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, categoryFilter } = state;
  return {
    categories,
    categoryFilter
  };
}

export default connect(
  mapStateToProps,
  {}
)(TableCategories);
