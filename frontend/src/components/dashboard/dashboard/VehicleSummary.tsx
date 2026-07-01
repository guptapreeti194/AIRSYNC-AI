import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react"
import { Airplane } from "phosphor-react";
import DashboardCard from "./DashboardCard"
import { fetchVehicles } from "../../../data/live/list" // adjust path as needed
import type { Vehicle } from "../../../types/live/list_type" // assuming you have a Vehicle type
import { useAuth } from "../../../context/AuthContext" // adjust path as needed

const VehicleSummary = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles(String(user?.id))
        // Ensure vehicles is always an array
        setVehicles(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to fetch vehicles", error)
      } finally {
        setLoading(false)
      }
    }

    getVehicles()
  }, [user?.id])

  if (loading) {
    return (
      <DashboardCard title="Fleet Overview">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 dark:border-cyan-400"></div>
            <span className="ml-3 text-slate-500 dark:text-slate-400">Loading...</span>
          </div>
        </div>
      </DashboardCard>
    )
  }

  const vehicleStats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "Active").length,
    noUpdate: vehicles.filter((v) => v.status === "No Update").length,
    noData: vehicles.filter((v) => v.status === "No Data").length,
  }

  const utilizationRate = vehicleStats.total > 0 ? Math.round((vehicleStats.active / vehicleStats.total) * 100) : 0

  const statItems = [
    {
      icon: Airplane,
      value: vehicleStats.total,
      label: "Total Fleet",
      bg: "bg-cyan-500/10 border border-cyan-500/20",
      iconColor: "text-cyan-500 dark:text-cyan-400"
    },
    {
      icon: CheckCircle,
      value: vehicleStats.active,
      label: "Active",
      bg: "bg-emerald-500/10 border border-emerald-500/20",
      iconColor: "text-emerald-500 dark:text-emerald-400"
    },
    {
      icon: Clock,
      value: vehicleStats.noUpdate,
      label: "No Update",
      bg: "bg-orange-500/10 border border-orange-500/20",
      iconColor: "text-orange-500 dark:text-orange-400"
    },
    {
      icon: XCircle,
      value: vehicleStats.noData,
      label: "No Data",
      bg: "bg-red-500/10 border border-red-500/20",
      iconColor: "text-red-500 dark:text-red-400"
    },
  ]

  return (
    <DashboardCard title="Fleet Overview">
      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {statItems.map((item) => (
            <div
              key={item.label}
              data-testid={`fleet-stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-center group cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div
                className={`mx-auto w-12 h-12 rounded-md ${item.bg} flex items-center justify-center mb-3 transition-all duration-300`}
              >
                <item.icon
                  className={`${item.iconColor} transition-transform duration-300`}
                  size={22}
                />
              </div>
              <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-1">{item.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Utilization Rate */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-md p-4 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-cyan-500 dark:text-cyan-400" size={18} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Fleet Utilization</span>
            </div>
            <span className="text-lg font-heading font-bold text-cyan-600 dark:text-cyan-400">{utilizationRate}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              style={{ width: `${utilizationRate}%` }}
              className="h-full bg-cyan-500 rounded-full transition-all duration-1000 ease-out"
            ></div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {vehicleStats.active} of {vehicleStats.total} vehicles currently active
          </p>
        </div>
      </div>
    </DashboardCard>
  )
}

export default VehicleSummary