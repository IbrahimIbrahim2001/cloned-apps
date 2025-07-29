import { useQuery } from "@tanstack/react-query";
import { getPins } from "../api/getPins";
export const useGetPins = () => {
    return useQuery({
        queryKey: ["Pins"],
        queryFn: getPins,
        retry: 2,
    });
};