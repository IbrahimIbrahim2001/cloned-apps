import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router';

export default function AuthHeader({ text }: { text: string }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <div className="flex justify-start items-center -mt-15 mb-10">
            <ChevronLeft onClick={handleClick} />
            <div className="flex justify-center w-full">
                <p className="font-bold text-sm">{text}</p>
            </div>
        </div>
    )
}
