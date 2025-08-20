import { CheckCheckIcon } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPasswordWithEmail } from './api/resetPasswordWithEmail'
import AuthHeader from '../components/authHeader'

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email address.' })
})


export default function ForgetPassword() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { email: '' }
    })

    const onSubmit = (formData: z.infer<typeof FormSchema>) => {
        const { email } = formData
        resetPasswordWithEmail(email);
        toast.custom(() => (
            <Alert className='border-green-600 text-green-600 dark:border-green-400 dark:text-green-400'>
                <CheckCheckIcon />
                <AlertTitle>Reset password link sent to your email</AlertTitle>
            </Alert>
        ))
    }

    return (
        <>
            <div className="flex flex-col space-y-2">
                <AuthHeader text="Forget password" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-xs space-y-6'>
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

                        <Button type='submit'>Send Link</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}


