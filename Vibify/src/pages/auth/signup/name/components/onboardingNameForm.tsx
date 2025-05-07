import {
    Form,
    FormControl,
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
import { signUp } from "../../api/signUp"
import { useOnboardingStore } from "../../store"


const onboardingNameForm = onboardingSchema.pick({
    name: true,
})

type OnboardingNameForm = z.infer<typeof onboardingNameForm>;

export default function OnboardingNamedForm() {
    const navigate = useNavigate();
    const { setData, name, email, password } = useOnboardingStore();
    const form = useForm<OnboardingNameForm>({
        resolver: zodResolver(onboardingNameForm),
        defaultValues: {
            name: "",
        }
    });
    const onSubmit = async (formData: OnboardingNameForm) => {
        setData(formData);
        if (email && password && name)
            await signUp(email, password, name, navigate)
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-[300px] space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl">What's your Name?</FormLabel>
                            <FormControl>
                                <Input placeholder="Jon Doe" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AuthButton text="Sign up" isSubmitting={form.formState.isSubmitting} />
            </form>
        </Form>
    )
}
