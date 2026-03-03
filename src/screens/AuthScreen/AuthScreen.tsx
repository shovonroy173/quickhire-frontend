"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/app/hooks";
import { pushToast } from "@/features/ui/uiSlice";
import { useLoginMutation, useRegisterMutation } from "@/features/user/userApi";

type AuthMode = "login" | "signup";

interface AuthScreenProps {
  initialMode?: AuthMode;
  redirectTo?: string;
}

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode = "login", redirectTo }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const isLogin = useMemo(() => mode === "login", [mode]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const requestedRedirect = redirectTo ?? searchParams.get("redirect") ?? "/";
  const safeRedirect = requestedRedirect.startsWith("/") ? requestedRedirect : "/";

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitLogin = loginForm.handleSubmit(async (values) => {
    await login(values).unwrap();
    dispatch(pushToast({ type: "success", title: "Logged in successfully" }));
    loginForm.reset();
    router.push(safeRedirect);
  });

  const submitSignup = signupForm.handleSubmit(async (values) => {
    await register(values).unwrap();
    dispatch(pushToast({ type: "success", title: "Account created successfully" }));
    signupForm.reset();
    router.push(safeRedirect);
  });

  return (
    <div className="min-h-screen bg-[#f7f7fb] px-4 py-10 sm:px-6 500 flex items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-xl border border-[#e4e5ef] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-[#4f46e5]">
            {"<- "}Back to home
          </Link>
          <span className="text-sm text-[#7c8493]">QuickHire</span>
        </div>

        <h1 className="text-2xl font-bold text-[#1f2a44]">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-[#7c8493]">
          {isLogin
            ? "Sign in to continue your job search."
            : "Join QuickHire and start applying to jobs."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-lg bg-[#f2f3fb] p-1">
          <button
            onClick={() => {
              setMode("login");
              signupForm.reset();
            }}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              isLogin ? "bg-white text-[#1f2a44] shadow-sm" : "text-[#6f7485]"
            }`}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("signup");
              loginForm.reset();
            }}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              !isLogin ? "bg-white text-[#1f2a44] shadow-sm" : "text-[#6f7485]"
            }`}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={isLogin ? submitLogin : submitSignup}>
          {!isLogin ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-[#25324b]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...signupForm.register("name")}
                className="w-full rounded-lg border border-[#d9deea] px-3 py-2.5 text-sm outline-none focus:border-[#4f46e5]"
              />
              {signupForm.formState.errors.name ? (
                <p className="mt-1 text-xs text-red-600">
                  {signupForm.formState.errors.name.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324b]">
              Email
            </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...(isLogin
                  ? loginForm.register("email")
                  : signupForm.register("email"))}
                className="w-full rounded-lg border border-[#d9deea] px-3 py-2.5 text-sm outline-none focus:border-[#4f46e5]"
              />
            {(isLogin ? loginForm.formState.errors.email : signupForm.formState.errors.email) ? (
              <p className="mt-1 text-xs text-red-600">
                {(isLogin
                  ? loginForm.formState.errors.email?.message
                  : signupForm.formState.errors.email?.message) as string}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324b]">
              Password
            </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...(isLogin
                  ? loginForm.register("password")
                  : signupForm.register("password"))}
                className="w-full rounded-lg border border-[#d9deea] px-3 py-2.5 text-sm outline-none focus:border-[#4f46e5]"
              />
            {(isLogin
              ? loginForm.formState.errors.password
              : signupForm.formState.errors.password) ? (
              <p className="mt-1 text-xs text-red-600">
                {(isLogin
                  ? loginForm.formState.errors.password?.message
                  : signupForm.formState.errors.password?.message) as string}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLogin ? isLoginLoading : isRegisterLoading}
            className="w-full rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
          >
            {isLogin
              ? isLoginLoading
                ? "Logging in..."
                : "Login"
              : isRegisterLoading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
