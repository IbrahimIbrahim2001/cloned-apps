import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import AuthButton from "../../components/authButton"
import supabase from "@/lib/supabase-client"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().min(2).email("not a valid email"),
    password: z.string().min(8).max(20)
})

export default function LoginForm() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    async function onSubmit(formData: z.infer<typeof formSchema>) {
        const { data, error } = await supabase.auth.signInWithPassword({ ...formData });
        if (error) {
            toast("Error on log in, check your email and password", {
                style: {
                    backgroundColor: "var(--popover)",
                    color: "var(--primary-foreground)",
                    border: "solid 1px oklch(63.7% 0.237 25.331)"
                }
            });
            return;
        }
        if (data) {
            //useUser with zustand
            navigate("../home")
        }
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
                    <AuthButton text="Log in" />
                </form>
            </Form>
        </>
    )
}
