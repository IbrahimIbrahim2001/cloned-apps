import { Route, Routes } from "react-router"
//protection and sessions
import ProtectedRoutesWrapper from "./layout/protectedRoutesWrapper"
import SessionWrapper from "./layout/sessionWrapper"
//layouts
import RootLayout from "./pages/root/rootLayout"
import AuthLayout from "./pages/auth/authLayout"
import SignupLayout from "./pages/auth/signup/signupLayout"
import ServicesLayout from "./pages/root/services/servicesLayout"
//pages
import ForgetPassword from "./pages/auth/forget-password/forget-password"
import LoginPage from "./pages/auth/login/loginPage"
import OnboardingEmailPage from "./pages/auth/signup/email/onboardingEmailPage"
import OnboardingNamePage from "./pages/auth/signup/name/onboardingNamePage"
import OnboardingPasswordPage from "./pages/auth/signup/password/onboardingPasswordPage"
import LibraryPage from "./pages/root/library/libraryPage"
import HomePage from "./pages/root/services/Home/home"
import { LikedTracksPage } from "./pages/root/services/liked tracks/likedTracksPage"
import { PlaylistPage } from "./pages/root/services/playlists/playlist/playlistPage"
import PlaylistsPage from "./pages/root/services/playlists/playlistsPage"
import SettingsPage from "./pages/root/settings/settingsPage"
import TrackDetailsPage from "./pages/root/trackDetails/trackDetailsPage"
import Start from "./pages/start/start"
import HistoryPage from "./pages/root/services/history/historyPage"
import NotificationsPage from "./pages/root/services/notifications/notificationsPage"
import PinsPage from "./pages/root/services/pins/pinsPage"
import SavedPage from "./pages/root/services/saved/savedPage"
import SearchPage from "./pages/root/search/searchPage"
import RecommendPage from "./pages/root/services/recommend/recommendPage"
import UpdatePasswordPage from "./pages/auth/updatePassword/updatePasswordPage"
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
                    <Route path="update-password" element={<UpdatePasswordPage />} />
                </Route>
                {/* Protected Routes */}
                <Route element={<ProtectedRoutesWrapper />}>
                    <Route element={<RootLayout />}>
                        <Route element={<ServicesLayout />}>
                            <Route path="home" element={<HomePage />} />
                            <Route path="liked-songs" element={<LikedTracksPage />} />
                            <Route path="playlists" element={<PlaylistsPage />} />
                            <Route path="playlist/:name" element={<PlaylistPage />} />
                            <Route path="history" element={<HistoryPage />} />
                            <Route path="pins" element={<PinsPage />} />
                            <Route path="saved-tracks" element={<SavedPage />} />
                            <Route path="notifications" element={<NotificationsPage />} />
                            <Route path="recommend" element={<RecommendPage />} />
                        </Route>
                        <> {/* in this section, the UI,the screen will not display the navbar and the bottom bar */}
                            <Route path="search" element={<SearchPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="track/:name" element={<TrackDetailsPage />} />
                            <Route path="your-library" element={<LibraryPage />} />
                        </>
                    </Route>
                </Route>
                {/* 404 Page --soon */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
        </Routes>
    )
}
