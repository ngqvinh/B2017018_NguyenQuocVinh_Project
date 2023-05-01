import http from "../common/http";
import store from "../store";

class ReviewService {

  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }

  get(id) { return http.get(`/reviews/${id}`); }
  getone(id) { return http.get(`/reviews/getone/${id}`); }
  create(id, data) { return http.post(`/reviews/${id}`, data); }
  update(id, data) { return http.put(`/reviews/${id}`, data); }
  delete(id) { return http.delete(`/reviews/${id}`); }
}

export default new ReviewService();