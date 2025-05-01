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

const onboardingPasswordSchema = onboardingSchema.pick({
    password: true,
})

type OnboardingPasswordSchema = z.infer<typeof onboardingPasswordSchema>;

export default function OnboardingPasswordForm() {
    const navigate = useNavigate();
    const { setData } = useOnboardingStore();
    const form = useForm<OnboardingPasswordSchema>({
        resolver: zodResolver(onboardingPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (data: OnboardingPasswordSchema) => {
        setData(data)
        navigate("../name")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="sm:w-[300px] space-y-8"
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl">What's your password?</FormLabel>
                            <FormControl>
                                <Input placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            <RequirementsList password={form.getValues("password")} />
                        </FormItem>
                    )}
                />
                <AuthButton text="Next" />
            </form>
        </Form>
    )
}

function RequirementsList({ password }: { password: string }) {
    const requirements = [
        {
            label: "At least 8 characters",
            met: hasMinimalLength(password),
        },
        {
            label: "Contains numbers",
            met: hasNumbers(password),
        },
        {
            label: "Contains special characters",
            met: hasSpecialCharacters(password),
        },
        {
            label: "Contains uppercase & lowercase",
            met: hasMixedCase(password),
        }
    ]
    return (
        <>
            {requirements.map((ele, index) => (
                <RequirementItem key={index} label={ele.label} met={ele.met} />
            )
            )}
        </>
    )
}

function RequirementItem({ label, met }: { label: string, met: boolean }) {
    return (
        <FormDescription
            className={`flex items-center gap-x-2 ${met && "text-green-600"}`}
        >
            {met ? "✓" : "°"} {label}
        </FormDescription>
    )
}

function hasMinimalLength(password: string): boolean {
    return password.length >= 8;
}
function hasNumbers(password: string): boolean {
    return /\d/.test(password);
}
function hasSpecialCharacters(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);

}
function hasMixedCase(password: string): boolean {
    return /[a-z]/.test(password) && /[A-Z]/.test(password);
}
