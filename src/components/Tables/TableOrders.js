import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseDB } from "../../firebase";
import { Link } from "react-router-dom";
import { links } from "../../routes";
import { ConfirmDialog } from "../ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";

class TableOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOrder: null,
      confirmDialog: false
    };

    this.setSelectedOrder = this.setSelectedOrder.bind(this);
    this.removeSelectedOrder = this.removeSelectedOrder.bind(this);
  }

  closeDialog = () => {
    this.setState({
      confirmDialog: false
    });
  };

  setSelectedOrder = (orderItem) => {
    this.setState({
      selectedOrder: orderItem,
      confirmDialog: true
    });
  };

  removeSelectedOrder = () => {
    const { id } = this.state.selectedOrder;
    firebaseDB.ref("orders/" + id).set(null, function(error) {
      if (error) {
        // The write failed...
        alert("The write failed...", error);
      } else {
        // Data saved successfully!
        toast.warning("Order  successfully deleted!", {
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
    const { items } = this.props.orders;
    return items.map((item) => {
      const {
        id,
        address,
        country,
        email,
        firstName,
        lastName,
        phone,
        products
      } = item;
      const filter = this.props.ordersFilter.filter.toLowerCase();
      if (
        item.firstName.toLowerCase().includes(filter) ||
        item.lastName.toLowerCase().includes(filter) ||
        item.phone.toLowerCase().includes(filter)
      ) {
        return (
          <tr key={id}>
            <td>{`${firstName} ${lastName}`}</td>
            <td>{phone}</td>
            <td>{products.length}</td>
            <td>{country}</td>
            <td>{address}</td>
            <td>
              <Link
                className="btn btn-info btn-sm table-btn mr-2"
                to={`${links.ORDERS}/${id}`}
              >
                <i className="fa fa-pencil-square-o fa-lg" /> Edit
              </Link>
              <button
                className="btn btn-danger btn-sm table-btn"
                onClick={() => {
                  this.setSelectedOrder(item);
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
          confirmTitle={"Delete order"}
          confirmQuestion={"Do you really want to delete order?"}
          isVisible={this.state.confirmDialog}
          submitAction={this.removeSelectedOrder}
          closeAction={this.closeDialog}
          confirmButtonClass={"danger"}
          confirmButtonMessage={"Delete"}
        />
        <table className="table table-hover table-bordered">
          <thead className="card-header">
            <tr>
              <th scope="col">User name</th>
              <th scope="col">Phone</th>
              <th scope="col">qt.</th>
              <th scope="col">Country</th>
              <th scope="col">Address</th>
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
  const { orders, ordersFilter } = state;
  return {
    orders,
    ordersFilter
  };
}

export default connect(
  mapStateToProps,
  {}
)(TableOrders);
