import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
export default function Start() {
    return (
        <>
            <div className="h-svh flex flex-col justify-center sm:justify-start items-center space-y-2 px-12 sm:pt-32">
                <p className="font-extrabold text-3xl">Vibify</p>
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
        </>
    )
}
