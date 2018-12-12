import React, { Component } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { connect } from "react-redux";
import { firebaseDB, firebaseStorage, storageRef } from "../firebase";
import { setBackButtonUrl } from "../ducks/backButton";
import { ToastContainer, toast } from "react-toastify";
import { configToast } from "../configToast";
import { setDashboardTitle } from "../ducks/dashboard";
import { links } from "../routes";

class CreateGoods extends Component {
  state = {
    pageTitle: "Create goods",
    name: "",
    categoryId: "",
    count: 0,
    price: 0.01,
    description: "",
    imgURL: null,
    isDisabled: true,
    errors: false,
    confirmDialog: false,
    file: null,
    isLoading: false,
    loadProgress: 0
  };

  componentDidMount() {
    this.props.setBackButtonUrl(links.GOODS);
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
      this.setState({ name: e.target.value, isDisabled: false });
    } else {
      this.setState({ name: e.target.value, isDisabled: true });
    }
  };

  createNewCategory = () => {
    const { name, categoryId, count, price, description, imgURL } = this.state;

    const goods = {
      name,
      categoryId,
      count,
      price,
      description,
      imgURL,
      createdAt: +new Date()
    };

    firebaseDB
      .ref("/goods")
      .push(goods)
      .then((res) => {
        this.setState({
          isOpenAlert: true,
          errors: false
        });
        toast.success(`Goods ${name} was successfully created!`, configToast);
      })
      .catch((err) => {
        this.setState({
          errors: true
        });
        toast.error(`Goods ${name} has not been created!`, configToast);
      });

    this.setState({
      confirmDialog: false,
      name: "",
      isDisabled: true
    });
  };

  handlerFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      confirmDialog: true
    });
  };

  renderCategoryOptions = () => {
    const { items } = this.props.categories;
    return items.map((item, index) => {
      const { id, categoryName } = item;
      return (
        <option key={id} value={id}>
          {categoryName}
        </option>
      );
    });
  };

  handlerPostImage = (e) => {
    const { files } = e.target;
    this.setState({
      file: files[0]
    });
  };

  handlerLoadButton = () => {
    const { file } = this.state;
    if (file === null) return;

    this.setState({
      isLoading: true,
      file: null
    });

    // Create the file metadata
    const metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef
      .child("images/goods/" + new Date())
      .put(file, metadata);

    const self = this;
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebaseStorage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({
          loadProgress: progress
        });
      },
      function(error) {
        toast.error(`Load image error - ${error}!`, configToast);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        /*switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }*/
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          self.setState({
            isLoading: false,
            loadProgress: 0,
            imgURL: downloadURL
          });
        });
        toast.success(
          "Image has been succesfully loaded on the server!",
          configToast
        );
      }
    );
  };

  handlerDeleteImageButton = () => {
    this.setState({
      imgURL: ""
    });
  };

  handlerInputDescription = (e) => {
    const { value } = e.target;
    this.setState({
      description: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handlerFormSubmit}>
        <ToastContainer />
        <ConfirmDialog
          confirmTitle={"Create goods"}
          confirmQuestion={`Do you really want create goods ${
            this.state.name
          }?`}
          isVisible={this.state.confirmDialog}
          submitAction={this.createNewCategory.bind(this)}
          closeAction={this.closeDialog}
          confirmButtonClass={"success"}
          confirmButtonMessage={"Create new goods"}
        />
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="exampleInputEmail1">
            Goods name:
          </label>
          <input
            id="inputCategoryName"
            type="text"
            className="form-control"
            placeholder="Name"
            maxLength="90"
            onChange={this.handlerInputCategoryName}
            value={this.state.name}
          />
          <div className="valid-feedback">Название свободно!</div>
          <div className="invalid-feedback">
            Такая категория уже существует!
          </div>
        </div>

        <div className="form-group">
          <label className="font-weight-bold" htmlFor="exampleInputEmail1">
            Price:
          </label>
          <input
            id="inputCategoryName"
            className="form-control"
            type="number"
            min="0.01"
            max="10000"
            step="0.01"
            maxLength="4"
            onChange={(e) => {
              this.setState({
                price: e.target.value
              });
            }}
            value={this.state.price}
          />
        </div>

        <div className="form-group">
          <label className="font-weight-bold" htmlFor="selectGoodsCategory">
            Select category:
          </label>
          <select
            className="form-control"
            id="selectGoodsCategory"
            onChange={(e) => {
              this.setState({ categoryId: e.target.value });
            }}
          >
            {this.renderCategoryOptions()}
          </select>
        </div>

        <div className="form-group">
          <label className="font-weight-bold" htmlFor="inputGoodsCount">
            Count:
          </label>
          <input
            id="inputGoodsCount"
            className="form-control"
            type="number"
            min="0"
            step="1"
            max="500"
            value={this.state.count}
            onChange={(e) => {
              this.setState({
                count: e.target.value
              });
            }}
          />
        </div>

        <div className="form-group">
          <label className="font-weight-bold" htmlFor="inputGoodsDescription">
            Description:
          </label>
          <textarea
            className="form-control"
            id="inputGoodsDescription"
            rows="3"
            value={this.state.description}
            onChange={this.handlerInputDescription}
          />
        </div>

        <div className="form-group d-flex">
          {this.state.imgURL ? (
            <div className="img-container">
              <img
                className="card p-2"
                src={this.state.imgURL}
                alt="img for the post"
                height="180"
              />
              <button
                className="btn btn-delete-image"
                onClick={this.handlerDeleteImageButton}
              >
                <i class="fa fa-times" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label className="mr-2" htmlFor="inputPostImage">
            Choose goods image
          </label>
          <input
            type="file"
            name="file"
            id="inputPostImage"
            onChange={this.handlerPostImage}
          />
          {this.state.isLoading ? (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: `${this.state.loadProgress}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          ) : null}

          {this.state.file ? (
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={this.handlerLoadButton}
            >
              Load File
            </button>
          ) : null}
        </div>

        <button
          className="btn btn-success"
          type="submit"
          disabled={this.state.isDisabled}
        >
          Create goods
        </button>
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
)(CreateGoods);
