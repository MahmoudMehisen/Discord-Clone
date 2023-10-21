"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { loginRequest } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-state";

const FormSchema = z.object({
  email: z.string().email("Invalid email!").min(1, "Invalid email!"),
  password: z.string().min(6, { message: "please enter your password" }),
});

const Login = () => {
  const router = useRouter();
  const { setToken, state } = useAuth();

  if (state.token) {
    router.push(`/`);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, password } = data;
      const response = await loginRequest(email, password);
      setToken(response?.data?.user?.token);
      toast({
        title: `welcome back ${response.data.user.username}`,
      });
      router.push(`/`);
    } catch (error: any) {
      toast({
        title: `${error?.response?.data}`,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto rounded"
        >
          <div className="flex flex-col justify-center items-center ">
            <h3 className="text-3xl font-semibold ">Welcome back!</h3>
            <p className="text-muted-foreground">
              We're so excited to see you again!
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  EMAIL <strong className="text-red-500">*</strong>
                </FormLabel>
                <FormControl>
                  <Input className="focus:border-0" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  PASSWORD <strong className="text-red-500">*</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    className="focus:border-0"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-8 bg-blue-700 text-white text-xl h-[50px] w-full hover:bg-blue-900  "
            onClick={() => {}}
            type="submit"
          >
            Log In
          </Button>
          <p className="text-left">
            Need an account?{" "}
            <Link className="text-blue-400 underline " href={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
