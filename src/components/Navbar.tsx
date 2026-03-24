import { Bell, LayoutDashboard, Building2, User, BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  unreadCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "eligibility", label: "Eligibility", icon: Building2 },
  { id: "applications", label: "Applications", icon: BriefcaseBusiness },
  { id: "notifications", label: "Alerts", icon: Bell },
];

export default function Navbar({ unreadCount, activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <BriefcaseBusiness className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold gradient-text">PlaceBridge</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.id === "notifications" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-3 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
            <User className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-border/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors relative ${
              activeTab === item.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
            {item.id === "notifications" && unreadCount > 0 && (
              <span className="absolute top-1 right-1/4 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
