import { useState } from 'react';
import { ArrowLeft, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface HeartRateReading {
  timestamp: string;
  bpm: number;
}

interface FormData {
  bpm: string;
  timestamp: string;
}

export function HeartRate() {
  const [readings, setReadings] = useState<HeartRateReading[]>([
    { timestamp: '2024-03-10 09:00', bpm: 72 },
    { timestamp: '2024-03-11 09:30', bpm: 75 },
    { timestamp: '2024-03-12 10:00', bpm: 68 },
  ]);

  const [formData, setFormData] = useState<FormData>({
    bpm: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const bpmNum = parseInt(formData.bpm);
    const timestamp = new Date(formData.timestamp);

    if (!formData.bpm || bpmNum < 40 || bpmNum > 220) {
      newErrors.bpm = 'Heart rate must be between 40 and 220 BPM';
    }

    if (timestamp > new Date()) {
      newErrors.timestamp = 'Future timestamps are not allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newReading: HeartRateReading = {
        timestamp: formData.timestamp,
        bpm: parseInt(formData.bpm),
      };

      setReadings([...readings, newReading].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        bpm: '',
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,Heart Rate (BPM)',
      ...readings.map(reading => 
        `${reading.timestamp},${reading.bpm}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'heart-rate-readings.csv';
    link.click();
  };

  const getHeartRateCategory = (bpm: number) => {
    if (bpm < 60) return { color: 'text-blue-500', label: 'Low' };
    if (bpm <= 100) return { color: 'text-green-500', label: 'Normal' };
    return { color: 'text-red-500', label: 'High' };
  };

  const filteredReadings = readings.filter(reading => {
    const readingDate = new Date(reading.timestamp);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    return (!fromDate || readingDate >= fromDate) && (!toDate || readingDate <= toDate);
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link 
          to="/trackers" 
          className="inline-flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trackers
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  value={formData.bpm}
                  onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  placeholder="40-220 BPM"
                />
                {errors.bpm && (
                  <p className="text-red-500 text-sm mt-1">{errors.bpm}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timestamp
                </label>
                <input
                  type="datetime-local"
                  value={formData.timestamp}
                  onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                />
                {errors.timestamp && (
                  <p className="text-red-500 text-sm mt-1">{errors.timestamp}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#5E17EB] text-white py-2 rounded-md hover:bg-[#8E2968] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Reading
              </button>
            </form>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Heart Rate Chart</h2>
              <div className="flex gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    placeholder="From"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    placeholder="To"
                  />
                </div>
                <button
                  onClick={exportToCSV}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Export data"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart
                  data={filteredReadings}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis domain={[30, 230]} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bpm"
                    stroke="#5E17EB"
                    name="Heart Rate"
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Readings Table */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Historical Readings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Timestamp</th>
                    <th className="text-left py-2">Heart Rate</th>
                    <th className="text-left py-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[...filteredReadings].reverse().map((reading, index) => {
                    const category = getHeartRateCategory(reading.bpm);
                    return (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">
                          {new Date(reading.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2">{reading.bpm} BPM</td>
                        <td className={`py-2 ${category.color}`}>
                          {category.label}
                        </td>
                      </tr>
                    )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}