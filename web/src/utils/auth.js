// Authentication utility functions

// Store auth token
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Store user data
export const setUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user));
};

// Get user data
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Remove user data
export const removeUserData = () => {
  localStorage.removeItem('userData');
};

// Logout helper
export const logout = () => {
  removeAuthToken();
  removeUserData();
};
