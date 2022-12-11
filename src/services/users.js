import api from "@/api/axios";

class UserService {
  getMe() {
    return api.get("users/me/");
  }

  getAll(page, size, searchQuery) {
    return api.get("users/", {
      params: { page: page, size: size, search_query: searchQuery },
    });
  }

  getById(id) {
    return api.get(`users/${id}`);
  }

  update(data) {
    return api.patch("users/me/", data);
  }

  updatePassword(data) {
    return api.post("users/update-password/", data);
  }

  resetPassword(data, token) {
    return api.post(`users/reset-password/${token}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  sendEmail(email) {
    return api.post("users/send-password-reset-link/", email);
  }

  updatePhoto(photo) {
    var formData = new FormData();
    formData.append("file", photo);
    return api.post("users/update-profile-photo/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  updateScientificDirections(idList) {
    return api.put("users/update-scientific-directions/", idList);
  }

  getRegistrationKeyList(page, pageSize) {
    return api.get(`users/registration-keys/?page=${page}&size=${pageSize}`);
  }

  generateRegistrationKeys(count) {
    return api.post(`users/registration-keys/${count}`);
  }

  getCurrentUserProjects(page = 1, size = 10) {
    return api.get(`users/my-projects?page=${page}&size=${size}`);
  }

  getUserProjects(userId, page = 1, size = 10) {
    return api.get(`users/${userId}/projects?page=${page}&size=${size}`);
  }
}

export default new UserService();
