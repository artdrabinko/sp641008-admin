import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseDB } from "../../firebase";
import TableGoodsRow from "./TableGoodsRow";
import { ConfirmDialog } from "../ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../../configToast";

class TableGoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGoods: null,
      confirmDialog: false
    };

    this.setSelectedGoods = this.setSelectedGoods.bind(this);
    this.removeSelectedGoods = this.removeSelectedGoods.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  closeDialog = () => {
    this.setState({
      confirmDialog: false
    });
  };

  setSelectedGoods = (categoryItem) => {
    this.setState({
      selectedGoods: categoryItem,
      confirmDialog: true
    });
  };

  removeSelectedGoods = () => {
    const { id, name } = this.state.selectedGoods;
    firebaseDB.ref("goods/" + id).set(null, function(error) {
      if (error) {
        toast.warning(
          `Goods ${name} has not been removed! ${error}`,
          configToast
        );
      } else {
        toast.warning(
          `Goods ${name} has been successfully removed!`,
          configToast
        );
      }
    });
    this.closeDialog();
  };

  renderRows = () => {
    const { items } = this.props.goods;

    console.log(items);

    return items.map((item) => {
      const { id } = item;
      const filter = this.props.goodsFilter.filter.toLowerCase();

      if (item.name.toLowerCase().includes(filter)) {
        return (
          <TableGoodsRow
            key={`row_goods_${id}`}
            item={item}
            deleteAction={this.setSelectedGoods}
          />
        );
      } else {
        return false;
      }
    });
  };

  render() {
    const goodsName = this.state.selectedGoods
      ? this.state.selectedGoods.name
      : "";
    return (
      <div>
        <ToastContainer />
        <ConfirmDialog
          confirmTitle={"Delete goods"}
          confirmQuestion={`Do you really want delete goods ${goodsName}?`}
          isVisible={this.state.confirmDialog}
          submitAction={this.removeSelectedGoods}
          closeAction={this.closeDialog}
          confirmButtonClass={"danger"}
          confirmButtonMessage={"Delete"}
        />
        <table className="table table-hover table-bordered">
          <thead className="card-header">
            <tr>
              <th scope="col">Goods name</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="card-body">{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { goods, goodsFilter } = state;
  return {
    goods,
    goodsFilter
  };
}

export default connect(
  mapStateToProps,
  {}
)(TableGoods);
