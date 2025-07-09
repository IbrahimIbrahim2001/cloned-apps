import { UserName } from "./components/userName";

export default function LikedTracksLayout({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <div className="flex justify-between my-3 pt-1">
                <UserName />
                {children}
            </div>
        </>
    )
}
