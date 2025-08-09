import VibifyLogo from "@/components/shared/vibifyLogo";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
export default function Start() {
    return (
        <>
            <div className="h-svh px-12 sm:pt-32 flex flex-col justify-center sm:justify-start">

                <VibifyLogo width="120" height="120" className="w-full justify-center" />
                <div className="justify-self-center flex flex-col justify-center sm:justify-start items-center space-y-2">
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent animate-pulse">
                        Vibify
                    </p>
                    <span className="text-sm font-semibold opacity-75">Welcome to our community</span>
                    <Link to="/signup/email" className="w-full sm:w-56">
                        <Button className="w-full bg-primary rounded-[45px]">Sign up for free</Button>
                    </Link>
                    <Button variant="outline" disabled className="flex justify-start w-full sm:w-56 bg-transparent rounded-[45px]">
                        <FcGoogle />
                        <p className="justify-self-center w-full">
                            Continue with google
                        </p>
                    </Button>
                    <Link to="/login">
                        <Button variant="link">Log in</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
