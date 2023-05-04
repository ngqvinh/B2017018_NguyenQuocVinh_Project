import http from "../common/http";
import store from "../store";

class InfoService {

  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }

  getAll() { return http.get("/info"); }
  get(id) { return http.get(`/info/${id}`); }
  create(data) { return http.post("/info", data); }
  update(id, data) { return http.put(`/info/${id}`, data); }
  delete(id) { return http.delete(`/info/${id}`); }
  findByName(title) { return http.get(`/info?title=${title}`); }
}

export default new InfoService();