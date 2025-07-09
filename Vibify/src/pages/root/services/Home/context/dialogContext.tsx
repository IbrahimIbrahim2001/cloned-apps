import { createContext, useContext, useState, type ReactNode } from "react"

interface DialogContextType {
    dialogState: boolean
    openDialog: () => void
    closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export default function DialogProvider({ children }: { children: ReactNode }) {
    const [dialogState, setDialogState] = useState<boolean>(false)

    const openDialog = () => {
        setDialogState(true)
    }

    const closeDialog = () => {
        setDialogState(false)
    }
    return (
        <DialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
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
