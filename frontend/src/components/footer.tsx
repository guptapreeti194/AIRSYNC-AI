import React from "react"
import { Link } from "react-router-dom"
import {  MapPin, Bell, LayoutDashboard, Map, FileText } from "lucide-react"
import { Airplane } from "phosphor-react";
import { useAuth } from "../context/AuthContext"
import { fetchRolesByUserId } from "../data/usermanage/responsibility"

interface FooterProps {
  version?: string
}

const Footer: React.FC<FooterProps> = ({ version = "v2.4.1" }) => {
  const currentYear = new Date().getFullYear()
  const { user } = useAuth()
  const [allowedTabs, setAllowedTabs] = React.useState<string[]>([])

  React.useEffect(() => {
    const fetchAccess = async () => {
      if (user && user.id) {
        try {
          const roles = await fetchRolesByUserId(user.id)
          if (roles && roles.length > 0) {
            const tabs = roles[0].tabs_access.map((tab: any) => Object.keys(tab)[0])
            setAllowedTabs(tabs)
          }
        } catch {
          setAllowedTabs([])
        }
      }
    }
    fetchAccess()
  }, [user])

  // Define quick access items with their required tab
  const quickAccessItems = [
    { icon: LayoutDashboard, label: "Trip Dashboard", path: "/trip-dashboard", tab: "trip_dashboard" },
    { icon: Airplane, label: "Live List", path: "/live/vehicles", tab: "list_map" },
    { icon: Map, label: "Live Map", path: "/live/vehicles", tab: "list_map" },
    { icon: MapPin, label: "Geofence Config", path: "/geofence/config", tab: "geofence_config" },
    { icon: FileText, label: "Reports", path: "/reports/report", tab: "report" },
    { icon: Bell, label: "Alarms", path: "/alarm/config", tab: "alarm" },
  ]

  return (
    <footer className="bg-slate-900 dark:bg-[#0a0f1c] border-t border-slate-800 text-slate-300 py-6 px-4" data-testid="app-footer">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 flex-wrap break-words w-full">
          {/* Company Info */}
          <div className="flex flex-col max-w-full md:max-w-md">
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 rounded-md bg-cyan-500/10 flex items-center justify-center text-white shadow-none mr-3 border border-cyan-500/30">
                <div className="flex-shrink-0 bg-slate-950 rounded-md p-1.5">
                  <Airplane size={24} className="text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-xl tracking-tight">AirSync AI</h3>
                <p className="text-sm text-slate-400">Air Traffic Control</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed ml-1 hidden md:block">
              Air traffic solution for real-time aircraft monitoring and management.
            </p>
          </div>

          {/* Quick Access */}
          <div className="flex-1 min-w-[250px]">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Access</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {quickAccessItems
                .filter(item => allowedTabs.includes(item.tab))
                .map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    data-testid={`footer-quicklink-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm group hover:text-cyan-400 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-md bg-slate-800/70 border border-slate-800 flex items-center justify-center mr-2.5 group-hover:border-cyan-500/50 transition-colors">
                      <item.icon size={15} className="text-slate-300 group-hover:text-cyan-400" />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4 w-full text-xs sm:text-sm">
          {/* Left: System Online + Build */}
          <div className="flex flex-wrap items-center gap-3 min-w-0">
            <div className="flex items-center px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
              <span className="text-emerald-400 whitespace-nowrap font-mono text-xs">System Online</span>
            </div>
            <div className="flex items-center bg-slate-800/60 border border-slate-800 px-3 py-1 rounded-sm">
              <span className="text-slate-400 mr-1.5">Build:</span>
              <span className="text-white font-mono">{version}</span>
            </div>
          </div>

          {/* Right: Attribution */}
          <div className="flex flex-wrap items-center gap-3 min-w-0 text-slate-400" data-testid="footer-attribution">
            <div className="whitespace-nowrap">© {currentYear} AirSync AI</div>
            <div className="hidden sm:block h-3 w-px bg-slate-700" />
            <div className="whitespace-nowrap">Made by Preeti Gupta</div>
            <div className="hidden sm:block h-3 w-px bg-slate-700" />
            <span>Need help?</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
