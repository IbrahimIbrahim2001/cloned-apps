import { useIsMobile } from "@/hooks/use-mobile"
import { Bookmark, Download, Forward, Loader, Pin, Trash2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { CgPlayListAdd } from "react-icons/cg"
import { removeFromHistory } from "../api/removeFromHistory"
import { useDialog } from "../services/Home/context/dialogContext"
import { addToPins, removeFromPins } from "../services/api/handlePins"
import { addToSavedTracks, removeFromSavedTracks } from "../services/api/handleSavedTracks"
import { useOptimisticHistoryStore } from "../services/history/store"
import { useGetPins } from "../services/pins/hooks/useGetPins"
import { useOptimisticPinsStore } from "../services/pins/store"
import { useGetSavedTracks } from "../services/saved/hooks/useGetSavedTracks"
import { useOptimisticSavedTracksStore } from "../services/saved/store"
import { useMusic } from "../store"
import { DatabaseTrack, Track } from "../types/track"
import { getTrackId } from "../utils/getTrackId"
import { toast } from "sonner"
import { getTrackTitle } from "../utils/getTrackTitle"
import { downloadTrack } from "../api/downloadtrack"
import { shareTrack } from "../api/shareTrack"

interface UseOptionListProps {
    trackFromHistory?: Track | DatabaseTrack
}


export function useOptionList({ trackFromHistory }: UseOptionListProps) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [trackState, setTrackState] = useState({ isSaved: false, isPined: false })
    const { isSaved, isPined } = trackState

    const isMobile = useIsMobile()
    const { track, } = useMusic()
    const { openDialog } = useDialog()

    const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore()
    const { optimisticPins, setOptimisticPins } = useOptimisticPinsStore()
    const { data: pins, isLoading: isLoadingPins } = useGetPins()
    const { optimisticSavedTracks, setOptimisticSavedTracks } = useOptimisticSavedTracksStore()
    const { data: savedTracks, isLoading: isLoadingSavedTracks } = useGetSavedTracks()

    const currentTrackForMenu = trackFromHistory || track

    const handleClick = useCallback(() => {
        if (currentTrackForMenu) {
            openDialog("addTrack")
        }
        if (isMobile) {
            setDrawerOpen(false)
        } else {
            setDropdownOpen(false)
        }
    }, [openDialog, isMobile, currentTrackForMenu])

    const handleRemoveFromHistory = useCallback(() => {
        if (!currentTrackForMenu) return

        const idToRemove = getTrackId(currentTrackForMenu)
        setOptimisticHistory(optimisticHistory.filter((t) => getTrackId(t) !== idToRemove))
        removeFromHistory(currentTrackForMenu)
    }, [currentTrackForMenu, optimisticHistory, setOptimisticHistory])

    useEffect(() => {
        if (!currentTrackForMenu) {
            setTrackState((prevState) => ({ ...prevState, isPined: false }))
            return
        }
        const currentTrackId = getTrackId(currentTrackForMenu)
        const isCurrentlyPined = pins?.some((p) => getTrackId(p) === currentTrackId)
        setTrackState((prevState) => ({ ...prevState, isPined: isCurrentlyPined ?? false }))
    }, [pins, currentTrackForMenu])

    useEffect(() => {
        if (!currentTrackForMenu) {
            setTrackState((prevState) => ({ ...prevState, isSaved: false }))
            return
        }
        const currentTrackId = getTrackId(currentTrackForMenu)
        const isCurrentlySaved = savedTracks?.some((s) => getTrackId(s) === currentTrackId)
        setTrackState((prevState) => ({ ...prevState, isSaved: isCurrentlySaved ?? false }))
    }, [savedTracks, currentTrackForMenu])

    const handleSave = useCallback(() => {
        if (!currentTrackForMenu) return

        if (isSaved) {
            const idToRemove = getTrackId(currentTrackForMenu)
            setOptimisticSavedTracks(optimisticSavedTracks.filter((t) => getTrackId(t) !== idToRemove))
            setTrackState((prevState) => ({ ...prevState, isSaved: false }))
            removeFromSavedTracks(currentTrackForMenu)
        } else {
            setOptimisticSavedTracks([...optimisticSavedTracks, currentTrackForMenu])
            setTrackState((prevState) => ({ ...prevState, isSaved: true }))
            addToSavedTracks(currentTrackForMenu)
        }
    }, [currentTrackForMenu, isSaved, optimisticSavedTracks, setOptimisticSavedTracks])

    const handlePin = useCallback(() => {
        if (!currentTrackForMenu) return

        if (isPined) {
            const idToRemove = getTrackId(currentTrackForMenu)
            setOptimisticPins(optimisticPins.filter((t) => getTrackId(t) !== idToRemove))
            setTrackState((prevState) => ({ ...prevState, isPined: false }))
            removeFromPins(currentTrackForMenu)
        } else {
            setOptimisticPins([...optimisticPins, currentTrackForMenu])
            setTrackState((prevState) => ({ ...prevState, isPined: true }))
            addToPins(currentTrackForMenu)
        }
    }, [currentTrackForMenu, isPined, optimisticPins, setOptimisticPins])


    const handleDownload = async () => {
        if (!currentTrackForMenu) return
        const trackID = getTrackId(currentTrackForMenu);
        const trackTitle = getTrackTitle(currentTrackForMenu)
        toast.success(
            <span>
                Downloading <strong>{trackTitle}</strong> to your device.
            </span>,
        )
        try {
            const audioBlob = await downloadTrack(trackID)

            if (audioBlob) {
                const url = window.URL.createObjectURL(audioBlob)
                const a = document.createElement("a")
                a.href = url
                a.download = `${trackTitle}.mp3`
                document.body.appendChild(a)
                a.click()
                a.remove()
                window.URL.revokeObjectURL(url)

                toast.success(
                    <span>
                        Downloaded <strong>{trackTitle}</strong> Successfully.
                    </span>,
                )
            } else {
                toast.error("No audio data received for download.")
            }
        } catch (err: unknown) {
            console.log(err)
            toast.error(`Failed to download track: ${trackTitle}`)
        }
    }


    const handleShare = () => {
        const trackTitle = getTrackTitle(currentTrackForMenu);
        toast.success("Copied successfully")
        shareTrack(trackTitle)


    }



    const optionsList = [
        {
            id: 1,
            text: "add to playlist",
            icon: <CgPlayListAdd className="size-5 mt-2" />,
            onclick: handleClick,
        },
        {
            id: 2,
            text: isSaved ? "saved" : "save track",
            icon: isLoadingSavedTracks ? <Loader className="size-6 animate-spin" /> : <Bookmark className={`size-5 mt-2 ${isSaved ? "fill-primary" : ""}`} />,
            onclick: handleSave,
        },
        {
            id: 3,
            text: isPined ? "pinned" : "pin",
            icon: isLoadingPins ? <Loader className="size-6 animate-spin" /> : <Pin className={`size-5 mt-2 ${isPined ? "fill-primary" : ""}`} />,
            onclick: handlePin,
        },
        {
            id: 4,
            text: "download",
            icon: <Download className="size-5 mt-2" />,
            onclick: handleDownload,
        },
        {
            id: 5,
            text: "Share",
            icon: <Forward className="size-5 mt-2" />,
            onclick: handleShare,
        },
        {
            id: 6,
            text: "remove from history",
            icon: <Trash2 className="size-5 mt-2" />,
            onclick: handleRemoveFromHistory,
            visible: optimisticHistory?.some((t) => getTrackId(t) === getTrackId(currentTrackForMenu)) ?? false,
        },
    ]

    return {
        drawerOpen,
        setDrawerOpen,
        dropdownOpen,
        setDropdownOpen,
        isMobile,
        optionsList,
    }
}