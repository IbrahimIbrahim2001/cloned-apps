import { Route, Routes } from "react-router"
import AuthLayout from "./pages/auth/authLayout"
import LoginPage from "./pages/auth/login/loginPage"
import Start from "./pages/start/start"
import SignupLayout from "./pages/auth/signup/signupLayout"
import OnboardingNamePage from "./pages/auth/signup/name/onboardingNamePage"
import OnboardingEmailPage from "./pages/auth/signup/email/onboardingEmailPage"
import OnboardingPasswordPage from "./pages/auth/signup/password/onboardingPasswordPage"
import HomePage from "./pages/root/services/Home/home"
import ForgetPassword from "./pages/auth/forget-password/forget-password"
import ProtectedRoutesWrapper from "./layout/protectedRoutesWrapper"
import RootLayout from "./pages/root/rootLayout"
import { Toaster } from 'sonner';
import ServicesLayout from "./pages/root/services/servicesLayout"
import SettingsPage from "./pages/root/settings/settingsPage"
import SessionWrapper from "./layout/sessionWrapper"

function App() {
  return (
    <>
      <div className="min-h-svh bg-background text-primary-foreground">
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
                  <Route index path="home" element={<HomePage />} />
                </Route>
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
            {/* 404 Page --soon */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>

      </div >
      <Toaster position="top-center" closeButton richColors />
    </>
  )
}

export default App
