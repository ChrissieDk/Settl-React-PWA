import axios from "axios";
import { UserIn } from "../types/Types";
// import { TokenRequestBody, TokenResponse } from "../types/Types";

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

// Replace <any> in both GET and POST requests.
export const initiateIssueToken = async (): Promise<any> => {
  try {
    const { data: requestBody } = await axiosInstance.get<any>(
      "payment/initiateissuetoken"
    );
    return requestBody;
  } catch (error) {
    console.error("Error during authentication token initiation:", error);
    throw error;
  }
};

// list available tokens(cards)
export const listTokens = async () => {
  try {
    const response = await axiosInstance.get("/payment/listtokens");
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};

// create order flow
export const createOrder = async (amount: number) => {
  try {
    const response = await axiosInstance.get(`/payment/createorder/${amount}`);
    console.log("Order created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// 3DS authentication
export const initiateAuthenticateToken = async (
  paymentToken: string,
  amount: number
) => {
  try {
    const response = await axiosInstance.get(
      `/payment/initiateauthenticatetoken/${paymentToken}/${amount}`
    );
    console.log("Token authenticated:", response.data);
    return response.data; // Ensure this returns the full response object
  } catch (error) {
    console.error("Error authenticating token:", error);
    throw error;
  }
};
