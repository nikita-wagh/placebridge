import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CompanyCard from "@/components/CompanyCard";
import ApplicationTracker from "@/components/ApplicationTracker";
import NotificationPanel from "@/components/NotificationPanel";
import StatsCards from "@/components/StatsCards";
import {
  companies, applications as initialApps, notifications as initialNotifs,
  currentStudent, checkEligibility, Application, Notification, Company,
} from "@/lib/mock-data";
import { GraduationCap } from "lucide-react";

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const unreadCount = notifs.filter(n => !n.isRead).length;
  const appliedIds = new Set(apps.map(a => a.companyId));

  const { eligible, notEligible } = useMemo(() => {
    const e: Company[] = [];
    const ne: Company[] = [];
    companies.forEach(c => {
      checkEligibility(currentStudent, c).eligible ? e.push(c) : ne.push(c);
    });
    return { eligible: e, notEligible: ne };
  }, []);

  const handleApply = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)!;
    const newApp: Application = {
      id: `a${Date.now()}`, studentId: currentStudent.id, companyId,
      status: "applied", appliedAt: new Date().toISOString(), company,
    };
    setApps(prev => [...prev, newApp]);
    setNotifs(prev => [{
      id: `n${Date.now()}`, studentId: currentStudent.id,
      message: `You applied to ${company.name} for ${company.role}`,
      isRead: false, createdAt: new Date().toISOString(), type: "info",
    }, ...prev]);
  };

  const handleMarkRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const shortlistedCount = apps.filter(a => ["shortlisted", "interview", "selected"].includes(a.status)).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar unreadCount={unreadCount} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container py-6 space-y-6">
        {/* Welcome */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-hero rounded-2xl p-6 md:p-8 text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm font-medium opacity-80">Welcome back</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{currentStudent.name}</h1>
            <p className="text-sm opacity-80">
              {currentStudent.department} • CGPA: {currentStudent.cgpa} • {currentStudent.skills.length} Skills
            </p>
          </motion.div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <StatsCards
              totalCompanies={companies.length}
              eligibleCount={eligible.length}
              appliedCount={apps.length}
              shortlistedCount={shortlistedCount}
            />
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Recent Applications</h2>
              <ApplicationTracker applications={apps.slice(0, 3)} />
            </section>
          </>
        )}

        {/* Eligibility */}
        {activeTab === "eligibility" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Eligible Companies ({eligible.length})
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eligible.map((c, i) => (
                  <CompanyCard key={c.id} company={c} index={i} onApply={handleApply} applied={appliedIds.has(c.id)} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Not Eligible ({notEligible.length})
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notEligible.map((c, i) => (
                  <CompanyCard key={c.id} company={c} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Applications */}
        {activeTab === "applications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your Applications ({apps.length})</h2>
            <ApplicationTracker applications={apps} />
          </motion.div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold text-foreground mb-3">Notifications</h2>
            <NotificationPanel notifications={notifs} onMarkRead={handleMarkRead} />
          </motion.div>
        )}
      </main>
    </div>
  );
}
