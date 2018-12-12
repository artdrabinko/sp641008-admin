import React, { Component } from "react";
import { Link } from "react-router-dom";
import { links } from "../../routes";

export class TableGoodsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };

    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const { id, name, price, count, description, imgURL } = this.props.item;

    return [
      <tr row="3" key={id}>
        <td>
          <button
            className="btn btn-outline-secondary btn-sm table-btn"
            onClick={this.toggleRow}
          >
            {this.state.isExpanded ? (
              <i className="fa fa-minus" />
            ) : (
              <i className="fa fa-plus" />
            )}
          </button>{" "}
          {name}
        </td>
        <td>{count}</td>
        <td>{`${price} $`}</td>
        <td>
          <Link
            className="btn btn-info btn-sm table-btn mr-2"
            to={`${links.GOODS}/${id}`}
          >
            <i className="fa fa-pencil-square-o fa-lg" /> Edit
          </Link>
          <button
            className="btn btn-danger btn-sm table-btn"
            onClick={(e) => {
              this.props.deleteAction({ id, name });
            }}
          >
            <i className="fa fa-trash-o fa-lg" /> Delete
          </button>
        </td>
      </tr>,
      <tr key={`description_goods_${id}`}>
        {this.state.isExpanded ? (
          <td colSpan="4">
            <img
              className="card inline-block p-1 mr-2 mb-1 float-left"
              src={imgURL}
              alt="Goods img"
              height="80"
            />
            <p>{description}</p>
          </td>
        ) : null}
      </tr>
    ];
  }
}

export default TableGoodsRow;
