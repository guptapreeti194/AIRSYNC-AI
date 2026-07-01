import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { User, ChevronDown, Menu, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "../context/AuthContext"
import DayNightToggleButton from './ui/dark-mode-button';

interface NavbarProps {
  toggleSidebar: () => void
}

function Navbar({ toggleSidebar }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Generate page title from current path
  const pageTitle = useMemo(() => {
    const path = location.pathname
    if (path === "/") return "Home"

    const pathSegments = path.split("/").filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1] || ""

    return (
      lastSegment
        .replace(/-|_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Dashboard"
    )
  }, [location])

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return null
  }

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-[#0a0f1c] z-40 border-b border-slate-200 dark:border-slate-800" data-testid="app-navbar">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - Logo and sidebar toggle */}
        <div className="flex items-center">
          <button
            data-testid="sidebar-toggle-button"
            onClick={toggleSidebar}
            className={cn(
              "mr-2 p-2 rounded-sm text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none",
              "md:hidden",
            )}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center">
            <Logo size="small" />

            <div className="ml-5 hidden sm:flex items-center">
              <div className="font-heading font-semibold text-lg text-slate-900 dark:text-white" data-testid="navbar-page-title">{pageTitle}</div>
            </div>
          </div>
        </div>

        {/* Right side - User actions and theme toggle */}
        <div className="flex items-center space-x-4">
          {/* Add the dark mode toggle here */}
          <DayNightToggleButton className="ml-6" /> {/* Adjust size as needed */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none group" data-testid="navbar-profile-trigger">
              <div className="flex items-center gap-2 p-1.5 rounded-sm hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 ease-out">
                <div className="relative">
                  <div className="h-9 w-9 rounded-sm bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-semibold transition-all duration-200 group-hover:border-cyan-400">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  {user.active && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900"></div>
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-24">
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                    {user.roles}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 transition-all duration-200 group-data-[state=open]:rotate-180 hidden sm:block ml-1" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 mt-2 mr-2 overflow-hidden animate-in slide-in-from-top-2 fade-in-0 zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-md">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-20 bg-slate-900 dark:bg-slate-950 relative border-b border-cyan-500/20"></div>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="h-16 w-16 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl font-mono font-bold border-4 border-white dark:border-[#111827]">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="pt-10 pb-6 px-6 text-center border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {user.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
                  {user.email}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div
                    data-testid="navbar-user-status-badge"
                    className={`inline-flex items-center px-3 py-1 rounded-sm text-xs border ${user.active
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${user.active ? 'bg-emerald-500' : 'bg-slate-400'} animate-pulse`}></div>
                    {user.active ? "Active" : "Inactive"}
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-sm text-xs bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    {user.roles}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <DropdownMenuItem
                  data-testid="navbar-view-profile-item"
                  className="group cursor-pointer rounded-sm p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  onClick={handleProfileClick}
                >
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-cyan-500/10 transition-colors duration-200">
                      <User className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-cyan-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">View Profile</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Manage your account settings</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="mx-2 bg-slate-100 dark:bg-slate-800" />

              {/* Sign Out Button */}
              <div className="p-2">
                <DropdownMenuItem
                  data-testid="navbar-logout-item"
                  className="group cursor-pointer rounded-sm p-3 text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 transition-all duration-200 border border-transparent hover:border-red-500/20"
                  onClick={handleLogout}
                >
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-sm bg-red-500/10 flex items-center justify-center mr-3">
                      <LogOut className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">Sign Out</span>
                      <span className="text-xs text-red-400/80">End your current session</span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
