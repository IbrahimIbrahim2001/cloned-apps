import { useQuery } from "@tanstack/react-query"
import { getProfileImage } from "../api/getProfileImage"

export const useProfileImage = () => {
    return useQuery({
        queryKey: ["profile-image"],
        queryFn: getProfileImage
    })
}