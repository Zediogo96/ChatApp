import axios from "axios";
import { Platform } from "react-native";

// 10.0.2.2 is the Android emulator's alias to localhost
import { localhost } from "@/constants";

const api = axios.create({
    baseURL: `http://${localhost}:8080`,
    timeout: 1000,
});

export default api;
