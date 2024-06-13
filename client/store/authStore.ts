import { create, useStore } from "zustand";

import { router } from "expo-router";
import { MMKVStorage, storage } from "@/utils/localStorage";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  isAuthenticated: boolean;
  jwt_token: string | null;
  user: User | null;
}

const initialState: State = {
  isAuthenticated: false,
  jwt_token: null,
  user: null,
};

const persistConfig = {
  name: "my-storage-persist-name",
  storage: createJSONStorage(() => MMKVStorage),
};

type Actions = {
  setIsAuthenticated: (data: LoginResponse) => void;
  setUnauthenticated: () => void;
};

type Store = State & Actions;

// Function currying is a workaround to allow skipping some generics when calling a function with multiple generics
const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      setIsAuthenticated: (data: LoginResponse) => {
        set({
          isAuthenticated: true,
          jwt_token: data.token,
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            bio: data.bio,
            avatar_url: data.avatar_url,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
        });

        router.replace("/home" as never);
      },
      setUnauthenticated: () => {
        set({ ...initialState });
        storage.delete("my-storage-persist-name");
        router.replace("/stack/Login");
      },
    }),

    persistConfig
  )
);

export default useAuthStore;
