"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      setError("Pogrešan email ili lozinka.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-white mb-1">Matija Pinko</h1>
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Admin panel</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Email</label>
            <input {...register("email")} type="email" className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="admin@example.com" autoFocus />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5">Lozinka</label>
            <input {...register("password")} type="password" className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#D4AF37] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#B8972E] transition-colors disabled:opacity-50">
            {isSubmitting ? "Prijava..." : "Prijava"}
          </button>
        </form>
      </div>
    </div>
  );
}
