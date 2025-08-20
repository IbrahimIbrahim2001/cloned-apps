import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Images, Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import ImagePreview from "./imagePreview"
import { useTranslation } from "react-i18next"
import { uploadProfileImage } from "../api/uploadProfileImage"

export default function UploadProfileImageForm() {
    const { t } = useTranslation();
    const formSchema = z.object({
        image: z.any().refine((files) => files?.length > 0, "Please select an image"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined,
        },
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const file = values.image[0]
        if (!file) return

        try {
            uploadProfileImage(file);
            toast.success("Profile image uploaded successfully!")
        } catch (error) {
            console.error("Upload failed:", error)
            toast.error("Upload failed. Please try again.")
        }
    }

    function onReset() {
        form.reset()
        form.clearErrors()
        setImagePreview(null)
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files[0]) {
            const file = files[0]
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file")
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB")
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 flex sm:block items-center  gap-x-2">{t("Upload Profile Picture")}</h2>
                <p className="text-muted-foreground flex sm:block items-center gap-x-2">{t("upload-description")}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange } }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-base font-medium">{t("Profile Picture")}</FormLabel>

                                {imagePreview && (
                                    <ImagePreview imagePreview={imagePreview} handleCancel={() => {
                                        setImagePreview(null)
                                        form.setValue("image", undefined)
                                    }} />
                                )}
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="pl-10"
                                            onChange={(e) => {
                                                onChange(e.target.files)
                                                handleFileChange(e)
                                            }}

                                        />
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Images className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-3">
                        <Button type="submit" disabled={form.formState.isSubmitting || !imagePreview} className="flex-1">
                            {form.formState.isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Image
                                </>
                            )}
                        </Button>

                        <Button type="reset" variant="outline" disabled={form.formState.isSubmitting || !imagePreview}>
                            Clear
                        </Button>
                    </div>
                </form>
            </Form>

            <div dir="ltr" className="text-sm text-muted-foreground space-y-1">
                <p>• Supported formats: JPG, PNG, GIF, WebP</p>
                <p>• Maximum file size: 5MB</p>
                <p>• Recommended: Square images work best</p>
            </div>
        </>
    )
}
