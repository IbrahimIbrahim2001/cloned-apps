import { Route, Routes } from "react-router"
import AuthLayout from "./pages/auth/authLayout"
import LoginPage from "./pages/auth/login/loginPage"
import Start from "./pages/start/start"
import SignupLayout from "./pages/auth/signup/signupLayout"
import OnboardingNamePage from "./pages/auth/signup/name/onboardingNamePage"
import OnboardingEmailPage from "./pages/auth/signup/email/onboardingEmailPage"
import OnboardingPasswordPage from "./pages/auth/signup/password/onboardingPasswordPage"
import HomePage from "./pages/app/Home/home"
import EmailConfirmationPage from "./pages/auth/emailConfirmation/emailConfirmationPage"
import ProtectedRoutesWrapper from "./layout/protectedRoutesWrapper"
import AppLayout from "./pages/app/appLayout"
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <div className="min-h-svh bg-background text-primary-foreground">
        <Routes>
          {/* Basic Routes */}
          <Route index element={<Start />} />
          <Route element={<AuthLayout />} >
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupLayout />}>
              <Route index path="email" element={<OnboardingEmailPage />} />
              <Route path="password" element={<OnboardingPasswordPage />} />
              <Route path="name" element={<OnboardingNamePage />} />
            </Route>
            <Route path="email-confirmation" element={<EmailConfirmationPage />} />
          </Route>
          <Route element={<ProtectedRoutesWrapper />}>
            <Route element={<AppLayout />}>
              <Route path="home" element={<HomePage />} />
            </Route>
          </Route>
          {/* 404 Page --soon */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <Toaster position="top-center" closeButton richColors />
    </>
  )
}

export default App
