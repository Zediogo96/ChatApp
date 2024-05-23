import axios from "axios";

// 10.0.2.2 is the Android emulator's alias to localhost
import { localhost } from "@/constants";
import useAuthStore from "@/store/authStore";
import { storage } from "@/utils/localStorage";
import showFeedbackToast from "@/utils/toast";

const api = axios.create({
    baseURL: `http://${localhost}:8080`,
    timeout: 1000,
});

// Add a request interceptor to inject JWT token into request headers
api.interceptors.request.use(
    (config) => {
        const jwtToken = useAuthStore.getState().jwt_token;

        // If the token exists, add it to the request headers
        if (jwtToken) config.headers.Authorization = jwtToken;

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
        if (
            error.response &&
            (error.response.status === 403 || error.response.status === 401)
        ) {
            // Call the logout method from your auth store
            useAuthStore.getState().setUnauthenticated();
            showFeedbackToast({
                type: "error",
                title: "Session Expired",
                message: "Please log in again to continue.",
                position: "bottom",
            });
        }
        return Promise.reject(error);
    }
);

export default api;
