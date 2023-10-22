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
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ImSpinner2 } from "react-icons/im";
// import { useAuth } from "@/store/auth-state";

const FormSchema = z.object({
  email: z.string().email("Invalid email!").min(1, "Invalid email!"),
  password: z.string().min(6, { message: "please enter your password" }),
});

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user) {
    return router.push("/channels");
  }

  if (status === "loading") {
    return (
      <div className="flex items-center  justify-center border-solid border-20 rounded-2xl w-[100px] h-[100px] bg-background">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, password } = data;

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.status === 401) {
        toast({
          title: `Email or password is incorrect`,
          variant: "destructive",
        });
        return;
      }
      if (res?.error) {
        toast({
          title: `${res?.error}`,
          variant: "destructive",
        });
      }
      router.push(`/channels`);
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
                  <Input className="focus:border-0" {...field} />
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
