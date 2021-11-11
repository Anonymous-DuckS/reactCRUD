import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get(`/users`);
  }

  get(user_Id) {
    return http.get(`/users/${user_Id}`);
  }

  create(data) {
    return http.post(`/users`, data);
  }

  update(user_Id, data) {
    return http.put(`/users/${user_Id}`, data);
  }

  delete(user_Id) {
    return http.delete(`/users/${user_Id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByName(user_Name) {
    return http.get(`/users?name=${user_Name}`);
  }
}

export default new UserDataService();