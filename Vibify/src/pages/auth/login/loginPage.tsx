import AuthHeader from "../components/authHeader";
import LoginForm from "./components/loginForm";

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col space-y-2">
                <AuthHeader text="Log in" />
                <LoginForm />
            </div>
        </>
    )
}
