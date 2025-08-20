import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type ImagePreviewProps = {
    imagePreview: string,
    handleCancel: () => void
}

export default function ImagePreview({ imagePreview, handleCancel }: ImagePreviewProps) {
    return (
        <>
            <div className="relative w-32 h-32 mx-auto">
                <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-full border-4 border-border"
                />
                <Button
                    type="button"
                    onClick={() => {
                        handleCancel();

                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </>
    )
}
