import { motion } from "framer-motion";
import { Notification } from "@/lib/mock-data";
import { Bell, Calendar, Info, Briefcase } from "lucide-react";

const typeIcon = {
  drive: Briefcase,
  deadline: Calendar,
  status: Bell,
  info: Info,
};

const typeColor = {
  drive: "bg-primary/10 text-primary",
  deadline: "bg-warning/10 text-warning",
  status: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
};

export default function NotificationPanel({ notifications, onMarkRead }: {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {notifications.map((n, i) => {
        const Icon = typeIcon[n.type];
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => !n.isRead && onMarkRead(n.id)}
            className={`glass-card rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all ${
              !n.isRead ? "border-l-4 border-l-primary" : "opacity-70"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.isRead ? "font-medium text-card-foreground" : "text-muted-foreground"}`}>
                {n.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            {!n.isRead && (
              <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
