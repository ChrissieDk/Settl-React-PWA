import axios from "axios";
import { UserIn } from "../types/Types";

const BASE_URL = "https://settl-api.azurewebsites.net/api";

// Function to get the token dynamically
const getAuthToken = () => `Bearer ${localStorage.getItem("bearer")}`;

// Function to create an instance of axios with default headers set
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to set the Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getAuthToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserById = async (id = 1) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (user: UserIn) => {
  try {
    const response = await axiosInstance.post("/user/register", user);
    console.log("User registered:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserId = async (firebaseUserId: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/login?firebaseId=${firebaseUserId}`
    );
    console.log("User logged in:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDetails = async () => {
  try {
    const response = await axiosInstance.get("/company/companydetails");
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};
