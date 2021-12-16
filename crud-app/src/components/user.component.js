import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser_Name = this.onChangeUser_Name.bind(this);
    this.onChangeUser_Pwd = this.onChangeUser_Pwd.bind(this);
    this.onChangeUser_Type = this.onChangeUser_Type.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        user_ID: null,
        user_Name: "",
        user_Pwd: "",
        user_Type: 0
      },
      message: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.getUser(this.props.match.params.user_ID);
  }

  onChangeUser_Name(e) {
    const user_Name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          user_Name: user_Name
        }
      };
    });
  }

  onChangeUser_Pwd(e) {
    const user_Pwd = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        user_Pwd: user_Pwd
      }
    }));
  }

  onChangeUser_Type(e) {
    const user_Type = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        user_Type: user_Type
      }
    }));
  }

  getUser(user_ID) {
    UserDataService.get(user_ID)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.user_Name,
      this.state.currentUser.user_Pwd,
      this.state.currentUser.user_Type
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.user_ID)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="user_Name">User_Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="user_Name"
                  value={currentUser.User_Name}
                  onChange={this.onChangeUser_Name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="user_Pwd">User_Pwd</label>
                <input
                  type="password"
                  className="form-control"
                  id="user_Pwd"
                  value={currentUser.User_Pwd}
                  onChange={this.onChangeUser_Pwd}
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_Type">User Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="user_Type"
                  required
                  value={this.state.user_Type}
                  onChange={this.onChangeUser_Type}
                  name="user_Type"
                />
              </div>
            </form>
            
            <div className="form-group">
            <span>&nbsp;</span>
            </div>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-primary"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}