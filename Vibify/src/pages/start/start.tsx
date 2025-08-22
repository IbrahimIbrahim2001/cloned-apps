import VibifyLogo from "@/components/shared/vibifyLogo";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import supabase from "@/lib/supabase-client";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Start() {

    const handleSignWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (!data || error) {
            toast.error("failed to login with google")
        }
    }

    return (
        <>
            <div className="h-svh px-12 sm:pt-32 flex flex-col justify-center sm:justify-start">
                <ShootingStars />
                <StarsBackground />
                <VibifyLogo width="120" height="120" className="w-full justify-center" />
                <div className="z-10 justify-self-center flex flex-col justify-center sm:justify-start items-center space-y-2">
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent animate-pulse">
                        Vibify
                    </p>
                    <span className="text-sm font-semibold opacity-75">Welcome to our community</span>
                    <Link to="/signup/email" className="w-full sm:w-56">
                        <Button className="w-full bg-primary rounded-[45px]">Sign up for free</Button>
                    </Link>
                    <Button onClick={handleSignWithGoogle} variant="outline" className="flex justify-start w-full sm:w-56 bg-transparent rounded-[45px]">
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
