import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Activity, Plus, Scale, Droplet, Stethoscope, Thermometer, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Outlet, Link, useLocation } from "react-router-dom";
import  MilestoneTracker  from "./MilestoneTracker";

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  lastUpdated: string;
  color: string;
  path: string;
}

export function Trackers() {
  const location = useLocation();
  const isOverviewPage = location.pathname === "/trackers";
  const [activeTab, setActiveTab] = useState<'health' | 'milestone'>('health');

  const [metrics] = useState<HealthMetric[]>([
    { id: "bp", name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: <Activity className="w-6 h-6" />, lastUpdated: "2 hours ago", color: "bg-pink-100 text-pink-600", path: "/trackers/bp" },
    { id: "weight", name: "Weight", value: "65", unit: "kg", icon: <Scale className="w-6 h-6" />, lastUpdated: "1 day ago", color: "bg-purple-100 text-purple-600", path: "/trackers/weight" },
    { id: "spo2", name: "SpO2", value: "98", unit: "%", icon: <Thermometer className="w-6 h-6" />, lastUpdated: "3 hours ago", color: "bg-blue-100 text-blue-600", path: "/trackers/spo2" },
    { id: "heart-rate", name: "Heart Rate", value: "72", unit: "bpm", icon: <Heart className="w-6 h-6" />, lastUpdated: "30 minutes ago", color: "bg-red-100 text-red-600", path: "/trackers/heart-rate" },
    { id: "blood-glucose", name: "Blood Glucose", value: "90", unit: "mg/dL", icon: <Droplet className="w-6 h-6" />, lastUpdated: "30 minutes ago", color: "bg-red-100 text-red-600", path: "/trackers/blood-glucose" },
    { id: "anemia", name: "Anemia", value: "90", unit: "mg/dL", icon: <Stethoscope className="w-6 h-6" />, lastUpdated: "30 minutes ago", color: "bg-red-100 text-red-600", path: "/trackers/anemia" },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const MetricWidget = ({ metric }: { metric: HealthMetric }) => (
    <Link to={metric.path}>
      <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow" role="button" tabIndex={0} aria-label={`${metric.name} tracker showing ${metric.value} ${metric.unit}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${metric.color}`}>{metric.icon}</div>
          <span className="text-xs text-gray-500">{metric.lastUpdated}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{metric.name}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
          <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
        </div>
      </motion.div>
    </Link>
  );

  const AddWidget = () => (
    <motion.button variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full" aria-label="Add new health metric">
      <div className="p-3 rounded-lg bg-[#5e17eb]/10 text-[#5e17eb] mb-4">
        <Plus className="w-6 h-6" />
      </div>
      <span className="text-lg font-semibold text-gray-800">Add More</span>
      <span className="text-sm text-gray-500 mt-1">Track new metric</span>
    </motion.button>
  );

  const TabButton = ({ tab, label }: { tab: 'health' | 'milestone'; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 font-medium rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-purple-600 text-white'
          : 'text-gray-600 hover:bg-purple-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header onTopicChange={(topic) => console.log(`Topic changed to: ${topic}`)} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {isOverviewPage ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="space-x-4">
                    <TabButton tab="health" label="Health Trackers For You" />
                    <TabButton tab="milestone" label="Milestone Tracker For Your Baby" />
                  </div>
                </div>

                {activeTab === 'health' ? (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {metrics.map((metric) => (
                      <MetricWidget key={metric.id} metric={metric} />
                    ))}
                    <AddWidget />
                  </motion.div>
                ) : (
                  <MilestoneTracker
                    childName="Krish"
                    childAge="1 week old"
                    weekNumber={1}
                    milestonesAnswered={2}
                    totalMilestones={11}
                  />
                )}
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}