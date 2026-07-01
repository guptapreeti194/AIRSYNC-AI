import { motion } from "framer-motion"
import { AlertCircle, AlertTriangle, Info, Shield, Activity } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { fetchAlertsByUser } from "@/data/alarm/alert"
import { useEffect, useState } from "react"
import DashboardCard from "./DashboardCard"

const AlertSummary = () => {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    if (user?.id) {
      fetchAlertsByUser(String(user.id)).then((res) => {
        // If API returns { data: [...] }
        if (res && Array.isArray(res.data)) {
          setAlerts(res.data)
        } else if (Array.isArray(res)) {
          setAlerts(res)
        } else {
          setAlerts([])
        }
      })
    }
  }, [user])

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity_type === "Critical").length,
    warning: alerts.filter((a) => a.severity_type === "Warning").length,
    general: alerts.filter((a) => a.severity_type === "General").length,
  }

  const criticalRate = alertStats.total > 0
    ? Math.round((alertStats.critical / alertStats.total) * 100)
    : 0

  const statItems = [
    {
      icon: Shield,
      value: alertStats.total,
      label: "Total Alerts",
      iconClass: "text-cyan-500 dark:text-cyan-400",
      bg: "bg-cyan-500/10 border border-cyan-500/20"
    },
    {
      icon: AlertCircle,
      value: alertStats.critical,
      label: "Critical",
      iconClass: "text-red-500 dark:text-red-400",
      bg: "bg-red-500/10 border border-red-500/20"
    },
    {
      icon: AlertTriangle,
      value: alertStats.warning,
      label: "Warning",
      iconClass: "text-orange-500 dark:text-orange-400",
      bg: "bg-orange-500/10 border border-orange-500/20"
    },
    {
      icon: Info,
      value: alertStats.general,
      label: "General",
      iconClass: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border border-emerald-500/20"
    },
  ]

  return (
    <DashboardCard title="Alert Management" delay={0.2}>
      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              data-testid={`alert-stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-center group cursor-pointer"
            >
              <div
                className={`mx-auto w-12 h-12 rounded-md ${item.bg} flex items-center justify-center mb-3 transition-all duration-300`}
              >
                <item.icon
                  className={`${item.iconClass} transition-transform duration-300`}
                  size={22}
                />
              </div>
              <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-1">{item.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Critical Alert Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-slate-50 dark:bg-slate-800/40 rounded-md p-4 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Activity className="text-red-500 dark:text-red-400" size={18} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Critical Alert Rate</span>
            </div>
            <span className="text-lg font-heading font-bold text-red-500 dark:text-red-400">{criticalRate}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${criticalRate}%` }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="h-full bg-red-500 rounded-full"
            ></motion.div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {alertStats.critical} critical alerts require immediate attention
          </p>
        </motion.div>
      </div>
    </DashboardCard>
  )
}

export default AlertSummary