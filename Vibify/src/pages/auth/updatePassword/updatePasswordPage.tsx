import { Alert, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCheckIcon } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, } from "react-router"
import { toast } from "sonner"
import { z } from "zod"
import AuthButton from "../components/authButton"
import { updatePassword } from "./api/updatePassword"

const FormSchema = z
    .object({
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default function UpdatePasswordPage() {
    const navigate = useNavigate()
    const location = useLocation();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    useEffect(() => {
        if (!location.hash) navigate("../login")
    }, [location.hash, navigate])

    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        if (!location.hash)
            try {
                const { email, password } = formData
                const result = await updatePassword(email, password)
                if (result.success) {
                    toast.custom(() => (
                        <Alert className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400">
                            <CheckCheckIcon />
                            <AlertTitle>Password updated successfully!</AlertTitle>
                        </Alert>
                    ))
                    navigate("/login")
                } else {
                    toast.error("Failed to update password")
                }
            } catch (error) {
                console.log(error);
                toast.error("An unexpected error occurred")
            }
    }

    return (
        <>
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold">Update Your Password</h1>
                    <p className="text-muted-foreground">Enter your new password below</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reset Your Password:</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email address' {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your email address to receive a reset link.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="reset your password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="confirm your password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AuthButton text="submit" isSubmitting={form.formState.isSubmitting} />
                    </form>
                </Form>
            </div>
        </>
    )
}
