import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import {  Activity, Plus, Scale, Droplet, Stethoscope ,Thermometer,Heart} from 'lucide-react'; //Thermometer,Heart, ( import for spO2)
import { motion } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

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

// Placeholder components for individual trackers
const BloodPressureTracker = () => <div>Blood Pressure Tracker (Coming Soon)</div>;
const WeightTracker = () => <div>Weight Tracker (Coming Soon)</div>;
const SpO2Tracker = () => <div>SpO2 Tracker (Coming Soon)</div>;
const HeartRateTracker = () => <div>Heart Rate Tracker (Coming Soon)</div>;

export function Trackers() {
  const location = useLocation();
  const [metrics] = useState<HealthMetric[]>([
    {
      id: 'bp',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: <Activity className="w-6 h-6" />,
      lastUpdated: '2 hours ago',
      color: 'bg-pink-100 text-pink-600',
      path: '/trackers/bp'
    },
    {
      id: 'weight',
      name: 'Weight',
      value: '65',
      unit: 'kg',
      icon: <Scale className="w-6 h-6" />,
      lastUpdated: '1 day ago',
      color: 'bg-purple-100 text-purple-600',
      path: '/trackers/weight'
    },

    {
      id: 'spo2',
      name: 'SpO2',
      value: '98',
      unit: '%',
      icon: <Thermometer className="w-6 h-6" />,
      lastUpdated: '3 hours ago',
      color: 'bg-blue-100 text-blue-600',
      path: '/trackers/spo2'
    },
  
    {
      id: 'heart-rate',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: <Heart className="w-6 h-6" />,
      lastUpdated: '30 minutes ago',
      color: 'bg-red-100 text-red-600',
      path: '/trackers/heart-rate'
    },
    {
        id: 'blood-glucose',
        name: 'Blood Glucose',
        value: '90',
        unit: 'mg/dL',
        icon: <Droplet className="w-6 h-6" />,
        lastUpdated: '30 minutes ago',
        color: 'bg-red-100 text-red-600',
        path: '/trackers/blood-glucose'
      },
      {
        id: 'anemia',
        name: 'Anemia',
        value: '90',
        unit: 'mg/dL',
        icon: <Stethoscope className="w-6 h-6" />,
        lastUpdated: '30 minutes ago',
        color: 'bg-red-100 text-red-600',
        path: '/trackers/anemia'
      },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const MetricWidget = ({ metric }: { metric: HealthMetric }) => (
    <Link to={metric.path}>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        role="button"
        tabIndex={0}
        aria-label={`${metric.name} tracker showing ${metric.value} ${metric.unit}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${metric.color}`}>
            {metric.icon}
          </div>
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
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full"
      aria-label="Add new health metric"
    >
      <div className="p-3 rounded-lg bg-[#A32E76]/10 text-[#A32E76] mb-4">
        <Plus className="w-6 h-6" />
      </div>
      <span className="text-lg font-semibold text-gray-800">Add More</span>
      <span className="text-sm text-gray-500 mt-1">Track new metric</span>
    </motion.button>
  );

  const isOverviewPage = location.pathname === '/trackers';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Health Trackers</h1>
                    <button 
                      className="px-4 py-2 bg-[#A32E76] text-white rounded-lg hover:bg-[#8E2968] transition-colors text-sm font-medium"
                    >
                      Update Metrics
                    </button>
                  </div>

                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {metrics.map((metric) => (
                      <MetricWidget key={metric.id} metric={metric} />
                    ))}
                    <AddWidget />
                  </motion.div>

                  {isOverviewPage && (
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Updates</h2>
                      <div className="space-y-4">
                        {metrics.map((metric) => (
                          <div key={metric.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${metric.color}`}>
                                {metric.icon}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{metric.name}</p>
                                <p className="text-sm text-gray-500">{metric.lastUpdated}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{metric.value} {metric.unit}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              } />
              <Route path="blood-pressure" element={<BloodPressureTracker />} />
              <Route path="weight" element={<WeightTracker />} />
              <Route path="spo2" element={<SpO2Tracker />} />
              <Route path="heart-rate" element={<HeartRateTracker />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}