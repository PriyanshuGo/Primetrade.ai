import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/schema/authSchema";
import { useNavigate } from "react-router-dom";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { authProps } from "@/types/auth";
import { loginUser } from "../../services/authService.js";
import { toast } from "sonner";



function Login({ setLogin }: authProps) {

  const navigate = useNavigate(); // ✅ initialize here


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    shouldUnregister: false, // 👈 keeps fields values even if component re-renders
  });

  const onSubmit = async ({ identifier, password }: LoginSchemaType) => {
    try {
      const res = await loginUser({identifier, password});
      if (res.success) {
        const {  accessToken, refreshToken } = res.data;

        // Save tokens to localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        toast.success("Login successful!", {duration: 2000});
        navigate("/"); 
      } else {
        toast.error("Login failed!",{duration: 2000});
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email or phone and password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Identifier */}
          <div className="grid gap-2">
            <Label htmlFor="identifier">Email or Phone</Label>
            <Input
              id="identifier"
              placeholder="m@example.com or 9876543210"
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="text-sm text-red-500">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button variant="link" onClick={() => setLogin(false)}>
          Don’t have an account? Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
