import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { router } from "expo-router";
import { storage } from "@/utils/localStorage";

type State = {
    isAuthenticated: boolean;
    jwt_token: string | null;
    user: any;
};

type Actions = {
    setIsAuthenticated: (token: string | null) => void;
    setUnauthenticated: () => void;
};

const initialState: State = {
    isAuthenticated: false,
    jwt_token: null,

    user: null,
};

const useAuthStore = create(
    immer<State & Actions>((set) => ({
        ...initialState,
        setIsAuthenticated: async (token: string | null) => {
            set((state) => {
                state.isAuthenticated = true;
            });

            // if there's a token, store it in local storage
            if (token) storage.set("jwt_token", token);

            router.replace("/" as never);
        },
        setUnauthenticated: async () => {
            set((state) => {
                state.isAuthenticated = false;
            });

            router.replace("Login" as never);
        },
    }))
);

export default useAuthStore;
