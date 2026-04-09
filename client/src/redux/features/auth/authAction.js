import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/Api";
import { toast } from "react-toastify";
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
        return rejectWithValue(error.message);
      }
    }
  },
);
//register

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      role,
      password,
      organisationName,
      hospitalName,
      website,
      phone,
      address,
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        role,
        password,
        organisationName,
        hospitalName,
        website,
        phone,
        address,
      });

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;

      toast.error(message); // ✅ always safe
      return rejectWithValue(message);
    }
  },
);
