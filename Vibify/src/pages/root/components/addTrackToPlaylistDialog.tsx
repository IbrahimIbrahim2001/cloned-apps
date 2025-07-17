import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDialog } from "../services/Home/context/dialogContext"
import { useGetTracks } from "../services/hooks/useGetTracks"
import { Music, Loader2 } from "lucide-react"
import { useState } from "react"
import { PlaylistType } from "../types/track"
import { useMusic } from "../store"
import { addToPlaylist } from "../api/addTrackToPlaylists"

export const AddTrackToPlaylistDialog = () => {
    const { isDialogOpen, closeDialog } = useDialog()
    const { data: playlists, isLoading } = useGetTracks("Your Playlists")
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { track } = useMusic();

    const handlePlaylistToggle = (playlistId: string) => {
        setSelectedPlaylists((prev) =>
            prev.includes(playlistId) ? prev.filter((id) => id !== playlistId) : [...prev, playlistId],
        )
    }

    const handleSubmit = async () => {
        if (selectedPlaylists.length === 0) return

        setIsSubmitting(true)
        try {
            if (track) {
                await addToPlaylist(track, selectedPlaylists)
            }
            setSelectedPlaylists([])
            closeDialog()
        } catch (error) {
            console.error("Error adding track to playlists:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setSelectedPlaylists([])
        closeDialog();
    }

    return (
        <Dialog open={isDialogOpen("addTrack")}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-muted">Add Track to Playlist</DialogTitle>
                    <DialogDescription className="flex gap-x-2 items-center">
                        Select playlists to add this track <Music className="size-4" />
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    ) : playlists && playlists.length > 0 ? (
                        <div className="space-y-3 max-h-60 overflow-y-auto text-muted">
                            {playlists.map((playlist: PlaylistType) => (
                                <div key={playlist.id} className="flex items-center space-x-3 p-2 rounded-lg">
                                    <Checkbox
                                        id={playlist.id}
                                        checked={selectedPlaylists.includes(playlist.id)}
                                        onCheckedChange={() => handlePlaylistToggle(playlist.id)}
                                        disabled={isSubmitting}
                                    />
                                    <Label
                                        htmlFor={playlist.id}
                                        className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {playlist.title || playlist.title}
                                    </Label>
                                    {playlist.playlist_tracks && (
                                        <span className="text-xs text-muted-foreground">{playlist.playlist_tracks?.length} tracks</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No playlists found</p>
                            <p className="text-sm">Create a playlist first to add tracks</p>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            className="border text-muted/90 hover:text-muted hover:bg-destructive hover:border-destructive"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isSubmitting || selectedPlaylists.length === 0}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            `Add to ${selectedPlaylists.length} playlist${selectedPlaylists.length !== 1 ? "s" : ""}`
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
