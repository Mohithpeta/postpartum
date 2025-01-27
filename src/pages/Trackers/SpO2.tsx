import { useState } from 'react';
import { ArrowLeft, Download, Plus, ZoomIn, ZoomOut } from 'lucide-react';
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

interface SpO2Reading {
  timestamp: string;
  oxygen: number;
  pulseRate: number;
}

interface FormData {
  oxygen: string;
  pulseRate: string;
  timestamp: string;
}

export function SpO2() {
  const [readings, setReadings] = useState<SpO2Reading[]>([
    { timestamp: '2024-03-10 09:00', oxygen: 98, pulseRate: 72 },
    { timestamp: '2024-03-11 09:30', oxygen: 97, pulseRate: 75 },
    { timestamp: '2024-03-12 10:00', oxygen: 99, pulseRate: 70 },
  ]);

  const [formData, setFormData] = useState<FormData>({
    oxygen: '',
    pulseRate: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [zoomLevel, setZoomLevel] = useState(1);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const oxygenNum = parseInt(formData.oxygen);
    const pulseRateNum = parseInt(formData.pulseRate);
    const timestamp = new Date(formData.timestamp);

    if (!formData.oxygen || oxygenNum < 70 || oxygenNum > 100) {
      newErrors.oxygen = 'SpO2 must be between 70% and 100%';
    }

    if (!formData.pulseRate || pulseRateNum < 40 || pulseRateNum > 220) {
      newErrors.pulseRate = 'Pulse rate must be between 40 and 220 BPM';
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
      const newReading: SpO2Reading = {
        timestamp: formData.timestamp,
        oxygen: parseInt(formData.oxygen),
        pulseRate: parseInt(formData.pulseRate),
      };

      setReadings([...readings, newReading].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        oxygen: '',
        pulseRate: '',
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,SpO2 (%),Pulse Rate (BPM)',
      ...readings.map(reading => 
        `${reading.timestamp},${reading.oxygen},${reading.pulseRate}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'spo2-readings.csv';
    link.click();
  };

  const getSpO2Category = (oxygen: number) => {
    if (oxygen >= 95) return { color: 'text-green-500', label: 'Normal' };
    if (oxygen >= 90) return { color: 'text-yellow-500', label: 'Mild Hypoxemia' };
    if (oxygen >= 85) return { color: 'text-orange-500', label: 'Moderate Hypoxemia' };
    return { color: 'text-red-500', label: 'Severe Hypoxemia' };
  };

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
                  Oxygen Saturation (%)
                </label>
                <input
                  type="number"
                  value={formData.oxygen}
                  onChange={(e) => setFormData({ ...formData, oxygen: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="70-100%"
                />
                {errors.oxygen && (
                  <p className="text-red-500 text-sm mt-1">{errors.oxygen}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pulse Rate (BPM)
                </label>
                <input
                  type="number"
                  value={formData.pulseRate}
                  onChange={(e) => setFormData({ ...formData, pulseRate: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="40-220 BPM"
                />
                {errors.pulseRate && (
                  <p className="text-red-500 text-sm mt-1">{errors.pulseRate}</p>
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
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                />
                {errors.timestamp && (
                  <p className="text-red-500 text-sm mt-1">{errors.timestamp}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#A32E76] text-white py-2 rounded-md hover:bg-[#8E2968] transition-colors flex items-center justify-center gap-2"
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
              <h2 className="text-xl font-semibold">SpO2 Chart</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.5))}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
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
                  data={readings}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis yAxisId="left" domain={[70, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 220]} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="oxygen"
                    stroke="#A32E76"
                    name="SpO2 (%)"
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="pulseRate"
                    stroke="#3b82f6"
                    name="Pulse Rate (BPM)"
                    dot={{ r: 4 }}
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
                    <th className="text-left py-2">SpO2</th>
                    <th className="text-left py-2">Pulse Rate</th>
                    <th className="text-left py-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readings].reverse().map((reading, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2">
                        {new Date(reading.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2">{reading.oxygen}%</td>
                      <td className="py-2">{reading.pulseRate} BPM</td>
                      <td className={`py-2 ${getSpO2Category(reading.oxygen).color}`}>
                        {getSpO2Category(reading.oxygen).label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}