import type React from "react"
import type { DashboardCardProps } from "../../../types/dashboard/dashboard_type"

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => {
  return (
    <div
      data-testid={`dashboard-card-${String(title).toLowerCase().replace(/\s+/g, '-')}`}
      className={`w-full bg-white dark:bg-[#111827] rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-cyan-500/30 dark:hover:border-cyan-500/30 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center">
        <span className="w-1 h-4 bg-cyan-500 rounded-full mr-2.5"></span>
        <h3 className="font-heading font-semibold text-slate-900 dark:text-white text-base">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default DashboardCard