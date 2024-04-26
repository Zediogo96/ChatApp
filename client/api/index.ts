import axios from "axios";
import { Platform } from "react-native";

// 10.0.2.2 is the Android emulator's alias to localhost
import { localhost } from "@/constants";
import useAuthStore from "@/store/authStore";
import { storage } from "@/utils/localStorage";

const api = axios.create({
    baseURL: `http://${localhost}:8080`,
    timeout: 1000,
});

// Add a request interceptor to inject JWT token into request headers
api.interceptors.request.use(
    (config) => {
        const jwtToken = storage.getString("jwt_token");

        // If the token exists, add it to the request headers
        if (jwtToken) config.headers.Authorization = `Bearer ${jwtToken}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 403 responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            // Call the logout method from your auth store
            useAuthStore.getState().setUnauthenticated();
        }
        return Promise.reject(error);
    }
);

export default api;
