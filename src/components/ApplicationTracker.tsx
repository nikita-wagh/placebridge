import { motion } from "framer-motion";
import { Application, ApplicationStatus } from "@/lib/mock-data";
import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";

const stages: { key: ApplicationStatus; label: string }[] = [
  { key: "applied", label: "Applied" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview", label: "Interview" },
  { key: "selected", label: "Selected" },
];

const statusColor: Record<ApplicationStatus, string> = {
  applied: "text-info",
  shortlisted: "text-warning",
  interview: "text-primary",
  selected: "text-success",
  rejected: "text-destructive",
};

function StageIndicator({ stage, current, rejected }: { stage: typeof stages[0]; current: ApplicationStatus; rejected: boolean }) {
  const stageIdx = stages.findIndex(s => s.key === stage.key);
  const currentIdx = stages.findIndex(s => s.key === current);
  const isComplete = !rejected && stageIdx < currentIdx;
  const isActive = !rejected && stage.key === current;
  const isRejected = rejected && stage.key === current;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
        isRejected ? "bg-destructive/15 text-destructive" :
        isComplete ? "bg-success/15 text-success" :
        isActive ? "bg-primary/15 text-primary animate-pulse-soft" :
        "bg-muted text-muted-foreground"
      }`}>
        {isRejected ? <XCircle className="w-4 h-4" /> :
         isComplete ? <CheckCircle2 className="w-4 h-4" /> :
         isActive ? <Clock className="w-4 h-4" /> :
         <Circle className="w-3 h-3" />}
      </div>
      <span className={`text-[10px] font-medium ${isActive || isComplete ? "text-foreground" : "text-muted-foreground"}`}>
        {stage.label}
      </span>
    </div>
  );
}

export default function ApplicationTracker({ applications }: { applications: Application[] }) {
  if (applications.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
        <p>No applications yet. Start applying to companies!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app, i) => {
        const rejected = app.status === "rejected";
        return (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-card-foreground">{app.company.name}</h4>
                <p className="text-xs text-muted-foreground">{app.company.role} • Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold capitalize ${statusColor[app.status]}`}>
                {app.status}
              </span>
            </div>

            <div className="flex items-center justify-between px-2">
              {stages.map((stage, idx) => (
                <div key={stage.key} className="flex items-center">
                  <StageIndicator stage={stage} current={app.status} rejected={rejected} />
                  {idx < stages.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-1 rounded-full ${
                      !rejected && stages.findIndex(s => s.key === app.status) > idx
                        ? "bg-success/40"
                        : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
