import VibifyLogo from "@/components/shared/vibifyLogo";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="w-full h-svh  flex flex-col justify-center items-center">
            <ShootingStars />
            <StarsBackground />
            <div className="absolute inset-0  flex items-center justify-center z-0 opacity-10">
                <VibifyLogo width="300" height="300" />
            </div>
            <div className="z-10 justify-self-center flex flex-col justify-center sm:justify-start items-center space-y-2">
                <span className="text-sm font-semibold text-red-500 opacity-75">Sorry this page not found</span>
                <Link to="../home" className="w-full sm:w-56">
                    <Button className="w-full bg-primary rounded-[45px]">Back to home page</Button>
                </Link>
                <Link to="/login">
                    <Button variant="link">Log in</Button>
                </Link>
            </div>
        </div>
    )
}
