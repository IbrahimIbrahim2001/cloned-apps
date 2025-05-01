import { z } from "zod";

export const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const onboardingSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email.")
    ,
    name: z.string().min(3, "name must be at least 3 characters").max(20, "name must not be more than 10 characters"),
    password: z.string()
        .min(8, "password must contain at least 8 characters")
        .max(20, "password must not be more than 20 characters")
        .regex(passwordValidation, {
            message: 'Your password is not valid'
        }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;