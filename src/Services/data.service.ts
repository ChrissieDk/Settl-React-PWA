import axios from "axios";

const BASE_URL = "https://settl-api.azurewebsites.net/api";

export const getAllUsers = () => {
  return axios
    .get(`${BASE_URL}/user/users`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      throw error;
    });
};
