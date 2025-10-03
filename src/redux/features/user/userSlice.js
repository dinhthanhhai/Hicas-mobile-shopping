import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUserThunk, getUserProfileThunk } from "./userThunk";

const initialState = {
  info: null,
  profile: null,
  isLogined: false,
  errMess: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return initialState;
    },
    checkAuth: (state) => {
      const token = Cookies.get("accessToken");
      if (token) {
        state.isLogined = true;
      } else {
        return initialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.errMess = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        const { accessToken, refreshToken, ...userInfo } = action.payload;
        state.info = userInfo;
        state.errMess = null;
        state.isLogined = true;
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLogined = false;
        state.errMess = action.payload || "Đăng nhập thất bại!";
      })
      .addCase(getUserProfileThunk.pending, (state) => {
        state.errMess = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.errMess = null;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.errMess = action.payload || "Lấy data thất bại!";
      });
  },
});

export const { logout, checkAuth } = userSlice.actions;
export default userSlice.reducer;
