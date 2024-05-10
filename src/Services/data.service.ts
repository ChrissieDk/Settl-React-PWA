import axios from "axios";

const BASE_URL = "https://settl-api.azurewebsites.net/api";

// users test
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/users`);
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};
