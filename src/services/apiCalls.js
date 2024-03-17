import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

// AUTH

export const registerUser = async (userData) => {
  const res = await axios.post("/api/auth/register", userData);
  return res.data;
};

export const userLogin = async (credentials) => {
  const res = await axios.post("/api/auth/login", credentials);
  return res.data;
};

// PROFILE

export const updateProfile = async (token, profileData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put("/api/auth/profile", profileData, config);
  return res.data;
};

// USERS

export const checkCustomerAppointments = async (token, profileData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/appointments", profileData, config);
  return res.data;
};

// ADMIN

export const getUserById = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/auth/profile", config);
  return res.data;
};

export const bringAllUsers = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  };
  const res = await axios.get("/api/users", config);
  return res.data;
};

export const deleteUserAdmin = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`/api/users/${userId}`, config);
  return res.data;
};

// ARTISTS

export const getArtists = async () => {
  const res = await axios.get("/api/artists");
  return res.data;
};

export const getArtistById = async (id) => {
  const res = await axios.get(`/api/artists/${id}`);
  return res.data;
};

export const getArtistsAdmin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/artist", config);
  return res.data;
};

// APPOINTMENTS

export const getUserAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/appointments", config);
  return res.data;
};

export const getArtistAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get("/api/appointments/artist", config);
  return res.data;
};

export const deleteAppointment = async (token, appointmentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`/api/appointments/${appointmentId}`, config);
  return res.data;
};

export const createAppointment = async (token, appointment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post("/api/appointments", appointment, config);
  return res.data;
};
