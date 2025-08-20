import { CircleUser } from "lucide-react";
import { useProfileImage } from "../hooks/useProfileImage";

export default function ProfileImage() {
    const { data: result, isLoading } = useProfileImage();
    return (
        <div>
            {isLoading ?
                <CircleUser className="ml-2 size-6 rounded-full" />
                :
                <>
                    <img src={result?.url} alt="profile image" className="ml-2 size-6 rounded-full" />
                </>
            }
        </div>
    )
}
