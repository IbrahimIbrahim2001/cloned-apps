import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router';

export default function PageHeader({ text }: { text: string }) {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const handleClick = () => {
        navigate(-1);
    }

    return (
        <div dir={isArabic ? "rtl" : "ltr"} className="flex justify-start items-center -mt-3 mb-5 -mx-2 sm:hidden">
            {!isArabic && <ChevronLeft onClick={handleClick} />}
            {isArabic && <ChevronRight onClick={handleClick} />}
            <div className="flex justify-center w-full">
                <p className="font-bold text-md text-muted/90">{text}</p>
            </div>
        </div>
    )
}