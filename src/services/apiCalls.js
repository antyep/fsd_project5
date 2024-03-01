import axios from "axios";

axios.defaults.baseURL = "https://fsd-project4.vercel.app";

export const registerUser = async (userData) => {
 const res = await axios.post('/api/auth/register', userData);
 return res.data;
};

export const userLogin = async (credentials) => {
 const res = await axios.post('/api/auth/login', credentials);
 return res.data; 
};

export const getUserById = async (token) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.get('/api/auth/profile', config);
 return res.data;
};

export const updateProfile = async (token, profileData) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.put('/api/auth/profile', profileData, config);
 return res.data;
};

export const getArtists = async () => {
 const res = await axios.get('/api/auth/artists');
 return res.data;
};

export const deleteAppointment = async (token, appointmentId) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.delete(`/api/appointments/${appointmentId}`, config);
 return res.data;
};

export const getAppointments = async (token) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.get('/api/appointments', config);
 return res.data;
};


export const getArtistsAdmin = async (token) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.get('/api/artist', config);
 return res.data;
};

export const bringAllUsers = async (token) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.get('/api/users', config);
 return res.data;
};

export const deleteUserAdmin = async (token, userId) => {
 const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
 };
 const res = await axios.delete(`/api/${userId}`, config);
 return res.data;
};

// todo

export const bringFilteredUsers = async (name, role) => {
    const res = await axios.get(`http://localhost:27017/user/megafiltro?name=${name}&role=${role}`)
    console.log(res, 'soy res en apicalls')
    return res.data
}


export const bringUsersByRole = async (role) => {
    const res = await axios.get(`http://localhost:27017/user?role=${role}`)
    return res.data
}