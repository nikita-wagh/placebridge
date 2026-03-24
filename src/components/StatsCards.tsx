import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock, BriefcaseBusiness } from "lucide-react";

interface StatsCardsProps {
  totalCompanies: number;
  eligibleCount: number;
  appliedCount: number;
  shortlistedCount: number;
}

export default function StatsCards({ totalCompanies, eligibleCount, appliedCount, shortlistedCount }: StatsCardsProps) {
  const stats = [
    { label: "Total Drives", value: totalCompanies, icon: Building2, color: "text-primary", bg: "bg-primary/10" },
    { label: "Eligible", value: eligibleCount, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
    { label: "Applied", value: appliedCount, icon: BriefcaseBusiness, color: "text-warning", bg: "bg-warning/10" },
    { label: "Shortlisted", value: shortlistedCount, icon: Clock, color: "text-info", bg: "bg-info/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card rounded-xl p-4 flex items-center gap-3"
        >
          <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
            <s.icon className={`w-5 h-5 ${s.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
