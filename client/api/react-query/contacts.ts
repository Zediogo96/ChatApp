import { useQuery } from "@tanstack/react-query";
import api from "..";
import useAuthStore from "@/store/authStore";

const useFavouriteContacts = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["favouriteContacts"],
        queryFn: async () => {
            const response = await api.get(`favourite-contacts/${user?.id}`);
            return response.data;
        },
    });
};

export default useFavouriteContacts;
