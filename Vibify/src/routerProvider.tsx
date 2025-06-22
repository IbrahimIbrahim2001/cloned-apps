import { Route, Routes } from "react-router"
import ProtectedRoutesWrapper from "./layout/protectedRoutesWrapper"
import SessionWrapper from "./layout/sessionWrapper"
import AuthLayout from "./pages/auth/authLayout"
import ForgetPassword from "./pages/auth/forget-password/forget-password"
import LoginPage from "./pages/auth/login/loginPage"
import OnboardingEmailPage from "./pages/auth/signup/email/onboardingEmailPage"
import OnboardingNamePage from "./pages/auth/signup/name/onboardingNamePage"
import OnboardingPasswordPage from "./pages/auth/signup/password/onboardingPasswordPage"
import SignupLayout from "./pages/auth/signup/signupLayout"
import RootLayout from "./pages/root/rootLayout"
import HomePage from "./pages/root/services/Home/home"
import ServicesLayout from "./pages/root/services/servicesLayout"
import SettingsPage from "./pages/root/settings/settingsPage"
import Start from "./pages/start/start"
import TrackDetailsPage from "./pages/root/trackDetails/trackDetails"

export default function RouterProvider() {
    return (
        <Routes>
            <Route element={<SessionWrapper />}>
                {/* Public Routes */}
                <Route index element={<Start />} />
                <Route element={<AuthLayout />} >
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupLayout />}>
                        <Route index path="email" element={<OnboardingEmailPage />} />
                        <Route path="password" element={<OnboardingPasswordPage />} />
                        <Route path="name" element={<OnboardingNamePage />} />
                    </Route>
                    <Route path="forget-password" element={<ForgetPassword />} />
                </Route>
                {/* Protected Routes */}
                <Route element={<ProtectedRoutesWrapper />}>
                    <Route element={<RootLayout />}>
                        <Route element={<ServicesLayout />}>
                            <Route path="home" element={<HomePage />}>
                                {/* <Route index element={<HomePage />} /> */}
                            </Route>
                        </Route>
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="track/:name" element={<TrackDetailsPage />} />
                    </Route>
                </Route>
                {/* 404 Page --soon */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
        </Routes>
    )
}
