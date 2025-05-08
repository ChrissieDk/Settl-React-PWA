import axios from "axios";
import { UserIn } from "../types/Types";
import { auth } from "../firebase-config";
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired, redirecting to login page");

      // Clear the expired token
      localStorage.removeItem("bearer");

      // Store a message that can be displayed on the login page
      localStorage.setItem(
        "loginMessage",
        "Session has expired. Please log in again to access your dashboard."
      );

      // Redirect to login page
      window.location.href = "/Settl-React-PWA/login"; // Adjust the path as needed

      return Promise.reject(error);
    }

    // If the error is not 401, reject the promise with the original error
    return Promise.reject(error);
  }
);

export const register = async (user: UserIn) => {
  try {
    const response = await axiosInstance.post("/user/register", user);
    console.log("User registered:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getUserId = async (firebaseUserId: string) => {
//   try {
//     const response = await axiosInstance.get(
//       `/user/login?firebaseId=${firebaseUserId}`
//     );
//     console.log("User logged in:", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const login = async () => {
  try {
    const response = await axiosInstance.get("/user/login");
    console.log("Login response:", response);
    console.log("User logged in:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// details of merchants within our network
export const getCompanyDetails = async () => {
  try {
    const response = await axiosInstance.get("/company/companydetails");
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};

// add a card
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
    console.error("Error fetching Cards", error);
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
  orderId: string
) => {
  try {
    const response = await axiosInstance.get(
      `/payment/initiateauthenticatetoken/${paymentToken}/${orderId}`
    );
    console.log("Token authenticated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error authenticating token:", error);
    throw error;
  }
};

// last leg of redemption phase - fires once all checks have passed and money is released
export const payment = async (orderId: string) => {
  try {
    const response = await axiosInstance.get(`/payment/payment/${orderId}`);
    console.log("payment completed", response.data);
    return response.data;
  } catch (error) {
    console.error("payment failed", error);
    throw error;
  }
};

export const cancelPayment = async (
  paymentToken: string,
  createOrderResponse: any
) => {
  try {
    const response = await axiosInstance.get(
      `/payment/payment/${paymentToken}`,
      createOrderResponse
    );
    console.log("payment completed", response.data);
    return response.data;
  } catch (error) {
    console.error("payment failed", error);
    throw error;
  }
};

// bring back all vouchers realting to users acount
export const getVouchers = async () => {
  try {
    const response = await axiosInstance.get("/payment/vouchers");
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};

// action redemption of vouchers
export const redeem = async (voucher: any) => {
  try {
    const response = await axiosInstance.post(`/payment/redeem`, voucher);
    console.log("Voucher redeemed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error redeeming voucher:", error);
    throw error;
  }
};

// bring back all yransactions relevant to user account
export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get("/payment/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// generated OTP to be redeemed by merchant
export const getOTP = async (testOtp: any) => {
  try {
    const response = await axiosInstance.post(
      "/payment/redemption/otp",
      testOtp
    );
    return response.data;
  } catch (error) {
    console.error("Error getting OTP:", error);
    throw error;
  }
};

// for merchant accpeting OTP/Payment for service
export const acceptOTP = async (otp: string, merchantId: string) => {
  try {
    const response = await axiosInstance.get(
      `/payment/redemption/accept/${otp}/${merchantId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting OTP:", error);
    throw error;
  }
};

export const fetchMerchantTransactions = async (
  userId?: string
): Promise<any[]> => {
  try {
    const query = userId ? `?userId=${userId}` : "";
    const response = await axiosInstance.get(`/merchant/transactions${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching merchant transactions:", error);
    throw error;
  }
};

// services/merchantService.ts

export const fetchMerchantUsers = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/merchant/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching merchant users:", error);
    throw error;
  }
};
