import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, MapPin, Users, Shield, TrendingUp } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
          localStorage.setItem("rememberedPassword", password)
          localStorage.setItem("rememberMe", "true")
        } else {
          localStorage.removeItem("rememberedEmail")
          localStorage.removeItem("rememberedPassword")
          localStorage.setItem("rememberMe", "false")
        }

        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: MapPin,
      title: "Real-time Flight Tracking",
      description: "Monitor aircraft, drones, and UAVs with live airspace updates and mission status.",
    },
    {
      icon: Users,
      title: "Multi-Vehicle & UAV Management",
      description: "Manage fleets of aircraft and unmanned vehicles from a unified aerospace platform.",
    },
    {
      icon: Shield,
      title: "Airspace Safety Alerts",
      description: "Set up geofences and receive instant notifications for airspace violations and safety risks.",
    },
    {
      icon: TrendingUp,
      title: "Aerospace Analytics",
      description: "Analyze flight patterns, mission data, and airspace utilization for operational optimization.",
    },
  ]

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail")
    const rememberedPassword = localStorage.getItem("rememberedPassword")
    const remember = localStorage.getItem("rememberMe") === "true"

    if (remember) {
      setEmail(rememberedEmail || "")
      setPassword(rememberedPassword || "")
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="min-h-screen xl:h-screen xl:flex bg-[#0a0f1c] xl:overflow-hidden" data-testid="signin-page">
      {/* Left side with enhanced content - Hidden on mobile and tablets, visible only on xl+ screens */}
      <div className="hidden xl:flex xl:w-3/5 relative overflow-hidden">
        {/* Background image with navy overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603793510575-a8cf24361baa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxuaWdodCUyMGNpdHlzY2FwZSUyMGFlcmlhbCUyMHZpZXd8ZW58MHx8fHwxNzgyOTM2Mjc5fDA&ixlib=rb-4.1.0&q=85"
            alt="Aerial night cityscape"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#0a0f1c]/95 to-[#0a0f1c]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-8 text-white">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-sm border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-6">
              AirSync AI Control Portal
            </div>
            <h2 className="text-4xl xl:text-5xl font-heading font-bold mb-6 leading-tight">
              Track, Monitor &amp;
              <span className="text-cyan-400">
                {" "}Control Flights
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Advanced aerospace tracking platform for real-time air traffic management, drone operations, and UAV control.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`signin-feature-${index}`}
                className="bg-slate-900/60 border border-slate-800 rounded-md p-5 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 text-sm">{feature.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side form - Full width on mobile/tablet, partial width on xl+ */}
      <div className="flex flex-1 xl:w-2/5 flex-col justify-center items-center px-6 md:px-12 lg:px-16 xl:px-16 py-12 xl:py-8 bg-white dark:bg-[#0a0f1c] min-h-screen xl:min-h-0">
        {/* Container for centering on medium devices */}
        <div className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-md">
          {/* Form Header */}
          <div className="mb-8 text-center xl:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg xl:text-base">
              Sign in to access your aerospace tracking portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  data-testid="signin-email-input"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 lg:py-4 xl:py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-base md:text-lg xl:text-base"
                  placeholder="you@example.com or username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  data-testid="signin-password-input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 md:py-4 lg:py-4 xl:py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-base md:text-lg xl:text-base"
                  placeholder="Your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  data-testid="signin-toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                data-testid="signin-remember-me-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 md:w-5 md:h-5 xl:w-4 xl:h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm md:text-base xl:text-sm text-slate-700 dark:text-slate-300">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              data-testid="signin-submit-button"
              disabled={isLoading}
              className="w-full py-3 md:py-4 lg:py-4 xl:py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-md transition-all duration-200 border border-cyan-400 flex items-center justify-center text-base md:text-lg xl:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-950 mr-2"></div>
              ) : (
                <MapPin className="w-5 h-5 mr-2" />
              )}
              {isLoading ? "Signing In..." : "Sign In to Portal"}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 p-4 md:p-6 xl:p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-md">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-cyan-500 mt-0.5">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm md:text-base xl:text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">Need Help?</h4>
                <p className="text-sm md:text-base xl:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Contact your aerospace administrator or our support team for assistance with portal access.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs md:text-sm xl:text-xs text-slate-500 text-center leading-relaxed">
              By signing in, you agree to our{" "}
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium">
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-slate-400 text-center mt-2" data-testid="signin-footer-attribution">Made by Preeti Gupta</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default SignIn
