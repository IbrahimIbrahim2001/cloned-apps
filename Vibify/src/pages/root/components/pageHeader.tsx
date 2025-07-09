import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router';

export default function PageHeader({ text }: { text: string }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <div className="flex justify-start items-center -mt-3 mb-5 -mx-2 sm:hidden">
            <ChevronLeft onClick={handleClick} />
            <div className="flex justify-center w-full">
                <p className="font-bold text-md text-muted/90">{text}</p>
            </div>
        </div>
    )
}