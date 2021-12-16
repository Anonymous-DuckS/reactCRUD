import React, { Component } from "react";
import UserDataService from "../services/user.service";
import User from "./user.component"
import { Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      Users: [],
      currentUser: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          Users: response.data
        }); 
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(User, index) {
    this.setState({
      currentUser: User,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    UserDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          Users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { Users, currentUser, currentIndex, searchName  } = this.state;
    const filteredUsers = Users.filter(user => user.user_Name.toLowerCase().includes(searchName.toLowerCase()));

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {Users &&
              filteredUsers.map((User, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(User, index)}
                  key={index}
                >
                  {User.user_Name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
                <h4>User Profile</h4>
              <div>
                <label>
                  <strong>User ID:</strong> {currentUser.user_ID}
                </label>{" "}
                
              </div>
              <div>
                
                <div>
                  <label>
                    <strong>User Name:</strong> {currentUser.user_Name}
                  </label>{" "}
                  
                </div>
                <div>
                  <label>
                    <strong>User Type:</strong> {currentUser.user_Type}
                  </label>{" "}
                  
                </div>
              </div>
              
              <Link
                to={"/users/:" + currentUser.user_ID} render={(props) => <User {...props}/>}
                className="btn btn-primary"
              >
                Edit
              </Link>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}