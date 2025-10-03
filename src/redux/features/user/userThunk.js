import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin, getUserProfile } from "../../../services/userServices";
import { setLoading } from "../uiSlice";

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { dispatch, thunkAPI }) => {
    try {
      dispatch(setLoading(true));
      const response = await userLogin(username, password);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Đăng nhập thất bại!");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch, thunkAPI }) => {
    try {
      dispatch(setLoading(true));
      const response = await getUserProfile();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Lấy thông tin thất bại!");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
