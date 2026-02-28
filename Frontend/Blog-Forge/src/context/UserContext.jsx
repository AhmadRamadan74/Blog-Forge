import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/user/${id}/profile`);
      setProfile(res.data.data[0]);
      return { success: true, data: res.data.data[0] };
    } catch (err) {
      setError(err.response?.data?.message || "User not found");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (searchKey) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/user/search`, { params: { searchKey } });
      setSearchResults(res.data.data || []);
      return { success: true };
    } catch (err) {
      setSearchResults([]);
      setError(err.response?.data?.message || "No users found");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id, { firstName, DOB }) => {
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/user/${id}`, { firstName, DOB });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Update failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/user/${id}`);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Delete failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ profile, searchResults, loading, error, getProfile, searchUsers, updateProfile, deleteUser, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
