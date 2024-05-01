import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { router } from "expo-router";
import { storage } from "@/utils/localStorage";

type State = {
    isAuthenticated: boolean;
    jwt_token: string | null;
    user: User | null;
};

type Actions = {
    setIsAuthenticated: (data: LoginResponse) => void;
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
        setIsAuthenticated: async (data: LoginResponse) => {
            set((state) => {
                console.log("data", data);
                state.isAuthenticated = true;
                state.jwt_token = data.token;

                state.user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    bio: data.bio,
                    avatar_url: data.avatar_url,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                };
            });

            // if there's a token, store it in local storage
            if (data.token) storage.set("jwt_token", data.token);

            router.replace("/" as never);
        },
        setUnauthenticated: async () => {
            set((state) => {
                state.isAuthenticated = false;
                state.jwt_token = null;
                state.user = null;
            });

            // remove the token from local storage
            storage.delete("jwt_token");

            router.replace("Login" as never);
        },
    }))
);

export default useAuthStore;
