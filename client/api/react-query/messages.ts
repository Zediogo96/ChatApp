import { useQuery } from "@tanstack/react-query";
import api from "..";
import useAuthStore from "@/store/authStore";

const useLastMessages = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["lastMessages"],
        queryFn: async () => {
            const response = await api.get(`messages/last/${user?.id}`, {
                params: {
                    limit: 10,
                },
            });

            return response.data;
        },
    });
};

export default useLastMessages;
