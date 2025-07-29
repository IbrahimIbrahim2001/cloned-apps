import { useQuery } from "@tanstack/react-query";
import { getHistory } from "./api/getHistory";
export const useGetHistory = () => {
    return useQuery({
        queryKey: ["history"],
        queryFn: getHistory,
        retry: 2,
    });
};