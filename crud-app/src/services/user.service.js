import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get(`/users`);
  }

  get(user_ID) {
    return http.get(`/users/${user_ID}`);
  }

  create(data) {
    return http.post(`/users`, data);
  }

  update(user_ID, data) {
    return http.put(`/users/${user_ID}`, data);
  }

  delete(user_ID) {
    return http.delete(`/users/${user_ID}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByName(user_Name) {
    console.log(`/users?user_Name=${user_Name}`);
    return http.get(`/users?user_Name=${user_Name}`);
  }
}

export default new UserDataService();