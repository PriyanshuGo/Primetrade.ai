import type { authProps } from "@/types/auth"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { UserPlus } from 'lucide-react'
import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

type Inputs = {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string,
    gender: string,
    dateOfBirth: string,
    profilePicture: File | null,
    address: string | null,
}

function Register({ setLogin }: authProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className="w-full max-w-2xl my-10 h-full">

            <Card className=" lg:my-10">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <UserPlus className="w-6 h-6" />
                        <CardTitle>Create Account</CardTitle>
                    </div>
                    <CardDescription>Fill in the details below to register</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input id="fullName" placeholder="Priyanshu Singh Rawat"  {...register("fullName", { required: "Full name is required" })} />
                            {errors.fullName && (
                                <p className="text-sm text-red-500">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" placeholder="priyanshu@gmail.com"   {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email address",
                                },
                            })}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password *</Label>
                                <Input id="password" type="password" placeholder="Minimum 6 characters"   {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <Input id="confirmPassword" type="password" placeholder="Re-enter password" {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" type="tel" placeholder="9876543210" maxLength={10} {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter a valid phone number",
                                },
                                validate: (value) =>
                                    value.length === 10 || "Phone number must be exactly 10 digits",
                            })} />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <RadioGroup onValueChange={(val) => (watch("gender") as string ) === val}>
                                <div className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" {...register("gender")}/>
                                        <Label htmlFor="male" className="cursor-pointer">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" {...register("gender")}/>
                                        <Label htmlFor="female" className="cursor-pointer">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="other" {...register("gender")}/>
                                        <Label htmlFor="other" className="cursor-pointer">Other</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")}/>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-2">
                            <Label htmlFor="profilePicture">Profile Picture</Label>
                            <Input id="profilePicture" type="file" accept="image/*" />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" placeholder="Delhi, India" rows={3}   {...register("address")}/>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2 pt-4">
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                            <Button type="button" variant="ghost" className="w-full" onClick={() => setLogin(true)}>
                                Already have an account? Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}

export default Register
