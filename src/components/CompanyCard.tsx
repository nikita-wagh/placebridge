import { motion } from "framer-motion";
import { MapPin, Calendar, IndianRupee, CheckCircle2, XCircle, Tag } from "lucide-react";
import { Company, checkEligibility, currentStudent } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompanyCardProps {
  company: Company;
  onApply?: (companyId: string) => void;
  applied?: boolean;
  index?: number;
}

const logoColors: Record<string, string> = {
  G: "from-blue-500 to-green-500",
  M: "from-blue-600 to-cyan-500",
  A: "from-orange-500 to-yellow-500",
  I: "from-blue-400 to-indigo-500",
  T: "from-indigo-500 to-purple-500",
  F: "from-yellow-400 to-blue-500",
};

export default function CompanyCard({ company, onApply, applied, index = 0 }: CompanyCardProps) {
  const { eligible, reasons, matchedSkills } = checkEligibility(currentStudent, company);
  const daysLeft = Math.ceil((new Date(company.deadline).getTime() - Date.now()) / 86400000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card rounded-xl p-5 flex flex-col gap-4 hover:scale-[1.01] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${logoColors[company.logo] || "from-primary to-accent"} flex items-center justify-center text-lg font-bold text-primary-foreground shadow-md`}>
            {company.logo}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{company.name}</h3>
            <p className="text-sm text-muted-foreground">{company.role}</p>
          </div>
        </div>
        {eligible ? (
          <Badge className="bg-success/15 text-success border-success/30 gap-1">
            <CheckCircle2 className="w-3 h-3" /> Eligible
          </Badge>
        ) : (
          <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/30 gap-1">
            <XCircle className="w-3 h-3" /> Not Eligible
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{company.location}</span>
        <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{company.package}</span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {company.requiredSkills.map(skill => (
          <Badge key={skill} variant="secondary" className={`text-xs ${matchedSkills.includes(skill) ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground"}`}>
            <Tag className="w-2.5 h-2.5 mr-1" />{skill}
          </Badge>
        ))}
      </div>

      {!eligible && reasons.length > 0 && (
        <div className="text-xs text-destructive/80 bg-destructive/5 rounded-lg px-3 py-2 space-y-0.5">
          {reasons.map((r, i) => <p key={i}>• {r}</p>)}
        </div>
      )}

      <div className="mt-auto pt-2">
        {applied ? (
          <Button disabled className="w-full" size="sm">Already Applied</Button>
        ) : eligible ? (
          <Button onClick={() => onApply?.(company.id)} className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90" size="sm">
            Apply Now
          </Button>
        ) : (
          <Button disabled variant="secondary" className="w-full" size="sm">Not Eligible</Button>
        )}
      </div>
    </motion.div>
  );
}
