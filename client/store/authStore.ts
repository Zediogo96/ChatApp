import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { router } from "expo-router";
import { storage } from "@/utils/localStorage";

type State = {
    isAuthenticated: boolean;

    user: any;
};

type Actions = {
    setIsAuthenticated: () => void;
    setUnauthenticated: () => void;
};

const initialState: State = {
    isAuthenticated: false,

    user: null,
};

const useAuthStore = create(
    immer<State & Actions>((set) => ({
        ...initialState,
        setIsAuthenticated: async () => {
            set((state) => {
                state.isAuthenticated = true;
            });


            const test = storage.getBoolean("isAuthenticated");


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
