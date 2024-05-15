import { useQuery } from "@tanstack/react-query";
import api from "..";
import useAuthStore from "@/store/authStore";
import useDebounce from "@/utils/hooks/useDebounce";

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

const useMessagesBySenderID = (senderID: string) => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["messagesBySenderID", senderID],
        queryFn: async () => {
            const response = await api.get(`messages/${user?.id}`, {
                params: {
                    senderID,
                },
            });

            return response.data;
        },
    });
};

const useMessagesBySearchQuery = (searchQuery: string, debounceTime: number = 250) => {
    const user = useAuthStore((state) => state.user);

    const debouncedSearchQuery = useDebounce(searchQuery, debounceTime);

    return useQuery({
        queryKey: ["messagesBySearchQuery", debouncedSearchQuery],
        queryFn: async () => {
            const response = await api.get(`messages/search/${user?.id}`, {
                params: {
                    query: debouncedSearchQuery,
                },
            });

            return response.data;
        },
        enabled: Boolean(debouncedSearchQuery),
    });
};

export default useLastMessages;

export { useMessagesBySenderID, useMessagesBySearchQuery };
