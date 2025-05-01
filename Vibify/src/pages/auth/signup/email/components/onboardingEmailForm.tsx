import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { onboardingSchema } from "@/features/signup (onboarding)/schema"
import AuthButton from "@/pages/auth/components/authButton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"
import { useOnboardingStore } from "../../store"
// import supabase from "@/lib/supabase-client"
// import { toast } from "sonner"

const onboardingEmailSchema = onboardingSchema.pick({
    email: true,
})

type OnboardingEmailSchema = z.infer<typeof onboardingEmailSchema>;

export default function OnboardingEmailForm() {
    const { setData } = useOnboardingStore();
    const navigate = useNavigate();
    const form = useForm<OnboardingEmailSchema>({
        resolver: zodResolver(onboardingEmailSchema),
        defaultValues: {
            email: "",
        }
    });
    const onSubmit = async (formData: OnboardingEmailSchema) => {
        setData(formData);
        navigate("../password");
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-[300px] space-y-8"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl">What's your email?</FormLabel>
                            <FormControl>
                                <Input placeholder="user@mail.com" type="email" {...field} />
                            </FormControl>
                            <FormDescription>you'll need to confirm the email later</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AuthButton text="Next" />
            </form>
        </Form>
    )
}
