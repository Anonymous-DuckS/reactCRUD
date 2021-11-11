import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser_Name = this.onChangeUser_Name.bind(this);
    this.onChangeUser_Pwd = this.onChangeUser_Pwd.bind(this);
    this.onChangeUser_Type = this.onChangeUser_Type.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      user_Id: null,
      user_Name: "",
      user_Pwd: "",
      user_Type: 0, 

      submitted: false
    };
  }

  onChangeUser_Name(e) {
    this.setState({
      user_Name: e.target.value
    });
  }

  onChangeUser_Pwd(e) {
    this.setState({
      user_Pwd: e.target.value
    });
  }

  onChangeUser_Type(e) {
    this.setState({
      user_Type: e.target.value
    });
  }

  saveUser() {
    var data = {
      user_Name: this.state.user_Name,
      user_Pwd: this.state.user_Pwd,
      user_Type: this.state.user_Type
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          user_Name: response.data.user_Name,
          user_Pwd: response.data.user_Pwd,
          user_Type: response.data.user_Type,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(JSON.stringify(e));
        console.log(data);
        console.log(this.state)
      });
  }

  newUser() {
    this.setState({
      user_Id: null,
      user_Name: "",
      user_Pwd: "",
      user_Type: 0,
      
      submitted: false
    });
  }

  render() {
    return (
        <div className="was-validated">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group" >
                <label htmlFor="user_Name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Username"
                  required
                  value={this.state.user_Name}
                  onChange={this.onChangeUser_Name}
                  name="Name"
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
              </div>

              <div className="form-group" >
                <label htmlFor="user_Pwd">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="user_Pwd"
                  placeholder="Enter Password"
                  required
                  value={this.state.user_Pwd}
                  onChange={this.onChangeUser_Pwd}
                  name="user_Pwd"
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
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
            
            <div className="form-group">
            <span>&nbsp;</span>
            </div>

              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}