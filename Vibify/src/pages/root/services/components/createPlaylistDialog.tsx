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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Music } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { PlaylistType } from "../../types/track"
import { createPlaylist } from "../api/createPlaylist"
import { useDialog } from "../Home/context/dialogContext"
import { usePlaylistStore } from "../playlists-store"

const formSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .min(2, "Title must be at least 2 characters")
        .max(20, "Title must be 20 characters or less")
        .trim(),
})


export default function CreatePlaylistDialog() {
    const { dialogState, closeDialog } = useDialog();
    const addOptimisticPlaylist = usePlaylistStore((state) => state.addOptimisticPlaylist)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    async function onSubmit(formData: z.infer<typeof formSchema>) {
        const { title } = formData
        const newPlaylist: PlaylistType = {
            id: `temp-${Date.now()}`,
            title,
            playlist_tracks: [],
        }
        addOptimisticPlaylist(newPlaylist)
        try {
            await createPlaylist(title)
            toast.success(`Playlist ${title} created successfully.`, {
                duration: 3000
            });

            form.reset()
            closeDialog()
        } catch (error) {
            console.log(error)
            toast.error("Failed to create playlist. Please try again.", { duration: 3000 })
        }
    }

    const handleCancel = () => {
        form.reset()
        closeDialog()
    }

    return (
        <Dialog open={dialogState}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-muted">
                    <DialogTitle>Create playlist</DialogTitle>
                    <DialogDescription>
                        <div className="flex gap-x-2 items-center">
                            Make sure to add some Tracks <Music className="size-4" />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 text-muted mb-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Playlist title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="new playlist" {...field} className="text-muted/70" disabled={form.formState.isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    className="border text-muted/90 hover:text-muted hover:bg-destructive hover:border-destructive"
                                    onClick={handleCancel}
                                    disabled={form.formState.isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
