import { createContext, useContext, useState, type ReactNode } from "react"

type DialogType = "createPlaylist" | "addTrack" | null;

interface DialogContextType {
    activeDialog: DialogType
    openDialog: (dialogType: DialogType) => void
    closeDialog: () => void
    isDialogOpen: (dialogType: DialogType) => boolean
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);


export default function DialogProvider({ children }: { children: ReactNode }) {
    const [activeDialog, setActiveDialog] = useState<DialogType>(null)

    const openDialog = (dialogType: DialogType) => {
        setActiveDialog(dialogType)
    }

    const closeDialog = () => {
        setActiveDialog(null)
    }

    const isDialogOpen = (dialogType: DialogType) => {
        return activeDialog === dialogType
    }

    return (
        <DialogContext.Provider value={{ activeDialog, openDialog, closeDialog, isDialogOpen }}>
            {children}
        </DialogContext.Provider>
    )
}

export const useDialog = () => {
    const context = useContext(DialogContext)
    if (context === undefined) {
        throw new Error("useDialog must be used within a DialogProvider")
    }
    return context
}
