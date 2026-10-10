"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ChevronLeft,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ensureAdminProfile } from "@/lib/admin-db";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authChecking, setAuthChecking] = useState(true);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await ensureAdminProfile(user.uid, user.email || "");
          router.replace("/admin");
        } catch (e) {
          console.warn("Profile check error:", e);
          router.replace("/admin");
        }
      } else {
        setAuthChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      // Ensure admin profile exists in Firestore
      await ensureAdminProfile(cred.user.uid, cred.user.email || email.trim());
      router.replace("/admin");
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      let msg = "Invalid credentials. Please verify your email and password.";
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        msg = "Incorrect email address or password. Please verify showroom credentials.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Please enter a valid email format.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Access temporarily limited due to repeated attempts. Please wait a few moments.";
      } else if (err.code === "auth/network-request-failed") {
        msg = "Network connection failed. Please check your internet connection.";
      } else if (err.message) {
        msg = err.message;
      }
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF5E14] mb-4" />
        <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
          Verifying Showroom Security Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex flex-col justify-between selection:bg-[#FF5E14] selection:text-white relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF5E14]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Public Showroom</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14]" />
          <span>Firebase Spark Protected</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {/* Brand header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-2xl border border-white/10 p-2.5 flex items-center justify-center shadow-inner">
              <Image
                src="/media/branding/udan-logo.png"
                alt="Udan Enterprises"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5E14]/10 border border-[#FF5E14]/20 text-[#FF5E14] text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3" />
              <span>Staff &amp; Executive Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Showroom CMS Login
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Udan Enterprises • Official Zuboo Galle Dealership Management
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Authorized Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. pibida17udan4131@gmail.com"
                  required
                  autoComplete="email"
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#FF3B30] hover:from-[#e04d09] hover:to-[#dc2626] text-white text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Showroom Owner and Staff RBAC enforced by Cloud Firestore Security Rules.
              Unauthorized access attempts are monitored and recorded.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-600 relative z-10">
        © 2026 Udan Enterprises (Pvt) Ltd. All rights reserved.
      </footer>
    </div>
  );
}
