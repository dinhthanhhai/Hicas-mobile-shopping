import axios from "../configs/axiosConfig";

export const getListProducts = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(
      `/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,rating`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(
      `/products/search?q=${keyword}&limit=1000`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
