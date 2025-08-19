import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { z } from "zod"
import AuthButton from "../../components/authButton"
import { login } from "../api/login"
import { useUserData } from "@/pages/root/store"

const formSchema = z.object({
    email: z.string().min(2).email("not a valid email"),
    password: z.string().min(8).max(20)
})

export default function LoginForm() {
    const { setUserData } = useUserData();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    async function onSubmit(formData: z.infer<typeof formSchema>) {
        const { email, password } = formData;
        await login(email, password, navigate, setUserData)
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[300px] space-y-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user@mail.com" {...field} />
                                    </FormControl>
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
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between items-start">
                        <Link to="../forget-password">
                            <Button type="button" variant="link" className="text-sm opacity-75 -ml-3">Forget password</Button>
                        </Link>
                        <AuthButton text="Log in" isSubmitting={form.formState.isSubmitting} />
                    </div>
                </form>
            </Form>
        </>
    )
}
