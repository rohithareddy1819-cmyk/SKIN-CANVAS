import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import logoImg from '../assets/logo-transparent.png';
import heroBg from '../assets/hero-landing.jpg';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // Simulate auth — replace with real Supabase auth if needed
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  const handleSocialSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-[#f5d6d8]/55 backdrop-blur-[2px]" />

      {/* Left branding — hidden on mobile */}
      <div className="relative z-10 hidden lg:flex flex-col justify-center px-16 flex-1 max-w-xl">
        <img src={logoImg} alt="SkinCanvas" className="h-20 w-auto object-contain mb-10 drop-shadow-md" />
        <h1 className="font-serif text-5xl xl:text-6xl font-light leading-tight text-[#2B1A1A] mb-6">
          Your Skin Story,<br />
          <span className="italic">Beautifully</span><br />
          Yours.
        </h1>
        <p className="font-sans text-base text-[#4a3030]/80 leading-relaxed max-w-sm">
          Sign in to continue your personalised beauty journey with SkinCanvas.
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4 lg:mx-16">
        <div className="bg-white/92 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-[#b97379]/20 px-8 py-10 border border-white/60">

          {/* Header */}
          <div className="mb-7">
            {/* Mobile logo */}
            <img src={logoImg} alt="SkinCanvas" className="h-12 w-auto object-contain mb-5 lg:hidden" />
            <h2 className="font-serif text-3xl font-medium text-[#2B1A1A] flex items-center gap-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
              <Heart className="h-5 w-5 text-[#b97379] fill-[#b97379]" />
            </h2>
            <p className="font-sans text-sm text-[#6b4f4f]/70 mt-1.5 leading-relaxed">
              {isSignUp
                ? 'Start your personalised beauty journey with SkinCanvas.'
                : 'Sign in to continue your personalised beauty journey with SkinCanvas.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b97379]/60 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#e8d0d2] bg-[#fdf8f8] pl-11 pr-4 py-3.5 font-sans text-sm text-[#2B1A1A] placeholder-[#b97379]/50 outline-none transition-all duration-200 focus:border-[#b97379] focus:ring-2 focus:ring-[#b97379]/20"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#b97379]/60 pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#e8d0d2] bg-[#fdf8f8] pl-11 pr-12 py-3.5 font-sans text-sm text-[#2B1A1A] placeholder-[#b97379]/50 outline-none transition-all duration-200 focus:border-[#b97379] focus:ring-2 focus:ring-[#b97379]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b97379]/60 hover:text-[#b97379] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Forgot password */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-sans text-xs text-[#b97379] hover:text-[#9d5f65] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#b97379] py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-[#b97379]/30 transition-all duration-300 hover:bg-[#a56268] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                <>{isSignUp ? 'Create Account' : 'Sign In'} &#8594;</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8d0d2]" />
            <span className="font-sans text-xs text-[#b97379]/60 uppercase tracking-wider">or</span>
            <div className="h-px flex-1 bg-[#e8d0d2]" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 justify-center">
            {/* Google */}
            <button
              id="google-signin"
              onClick={handleSocialSignIn}
              disabled={loading}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d0d2] bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#b97379]/40 disabled:opacity-60"
              aria-label="Sign in with Google"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              id="apple-signin"
              onClick={handleSocialSignIn}
              disabled={loading}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d0d2] bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#b97379]/40 disabled:opacity-60"
              aria-label="Sign in with Apple"
            >
              <svg className="h-5 w-5 text-[#1d1d1f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>

            {/* Microsoft */}
            <button
              id="microsoft-signin"
              onClick={handleSocialSignIn}
              disabled={loading}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d0d2] bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#b97379]/40 disabled:opacity-60"
              aria-label="Sign in with Microsoft"
            >
              <svg className="h-5 w-5" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
            </button>
          </div>

          {/* Toggle sign up / sign in */}
          <p className="mt-6 text-center font-sans text-sm text-[#6b4f4f]/70">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button
              id="toggle-auth-mode"
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="font-semibold text-[#b97379] hover:text-[#9d5f65] transition-colors underline-offset-2 hover:underline"
            >
              {isSignUp ? 'Sign in \u2192' : 'Create account \u2192'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
