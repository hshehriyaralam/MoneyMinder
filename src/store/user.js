import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export async function fetchUser() {
  const response = await axios.get(`${API_BASE_URL}/api/user/fetch-user`, {
    withCredentials: true,
  });
  return response.data.user;
}

export async function signUp(userData) {
  return axios.post(`${API_BASE_URL}/api/user/signup`, userData, {
    withCredentials: true,
  });
}

export async function logIn(credentials) {
  return axios.post(`${API_BASE_URL}/api/user/login`, credentials, {
    withCredentials: true,
  });
}

export async function googleLogIn(accessToken) {
  const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axios.post(
    `${API_BASE_URL}/api/user/google-auth`,
    { userInfo: response.data },
    { withCredentials: true },
  );
}

export async function updateUser(userData) {
  return axios.put(`${API_BASE_URL}/api/user/edit-user`, userData, {
    withCredentials: true,
  });
}

export async function uploadProfilePicture(formData) {
  return axios.post(`${API_BASE_URL}/api/user/upload-profile`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function logOut() {
  return axios.post(`${API_BASE_URL}/api/user/logout`, {}, {
    withCredentials: true,
  });
}

export async function deleteUser() {
  return axios.delete(`${API_BASE_URL}/api/user/delete-user`, {
    withCredentials: true,
  });
}
