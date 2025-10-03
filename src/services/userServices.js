import axios from "../configs/axiosConfig";

export const userLogin = async (username, password) => {
  try {
    let response = await axios.post("/auth/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  try {
    let response = await axios.get("/auth/me");
    return response;
  } catch (error) {
    console.log(error);
  }
};
