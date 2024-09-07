import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // API URL from .env file
  const API_URL = import.meta.env.VITE_API_URL;

  // Log in a user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      setError(null);
      return true; // Return true on success
    } catch (err) {
      // Handle authentication errors
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to log in'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error logging in:', err);
      return false; // Return false on failure
    } finally {
      setLoading(false);
    }
  };

  // Register a user
  const register = async ({ firstname, lastname, email, password }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, { firstname, lastname, email, password });
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      setError(null);
      return true; // Return true on success
    } catch (err) {
      // Handle registration errors
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to register'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error registering:', err);
      return false; // Return false on failure
    } finally {
      setLoading(false);
    }
  };

  // Log out a user
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(response.data.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch user details'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update user details
  const updateUserDetails = async (userDetails) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/users/me`, userDetails, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setError(null);
      await fetchUserDetails(); // Refresh user details
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to update user details'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error updating user details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      logout(); // Log out the user after deletion
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to delete user'}`);
      } else if (err.request) {
        setError('Error: No response received from server');
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserDetails();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, user, login, register, logout, fetchUserDetails, updateUserDetails, deleteUser, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;