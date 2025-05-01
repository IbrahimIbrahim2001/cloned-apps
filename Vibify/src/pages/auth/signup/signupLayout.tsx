import { Outlet } from "react-router";
import AuthHeader from "../components/authHeader";

export default function SignupLayout() {
    return (
        <div className="flex flex-col space-y-2">
            <AuthHeader text="Create Account" />
            <Outlet />
        </div>
    )
}
