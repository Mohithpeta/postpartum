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

interface BPReading {
  timestamp: string;
  systolic: number;
  diastolic: number;
}

interface FormData {
  systolic: string;
  diastolic: string;
  timestamp: string;
}

export function BP() {
  const [readings, setReadings] = useState<BPReading[]>([
    { timestamp: '2024-03-10 09:00', systolic: 120, diastolic: 80 },
    { timestamp: '2024-03-11 09:30', systolic: 118, diastolic: 79 },
    { timestamp: '2024-03-12 10:00', systolic: 122, diastolic: 82 },
  ]);

  const [formData, setFormData] = useState<FormData>({
    systolic: '',
    diastolic: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [zoomLevel, setZoomLevel] = useState(1);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const systolicNum = parseInt(formData.systolic);
    const diastolicNum = parseInt(formData.diastolic);
    const timestamp = new Date(formData.timestamp);

    if (!formData.systolic || systolicNum < 90 || systolicNum > 200) {
      newErrors.systolic = 'Systolic pressure must be between 90 and 200 mmHg';
    }

    if (!formData.diastolic || diastolicNum < 60 || diastolicNum > 130) {
      newErrors.diastolic = 'Diastolic pressure must be between 60 and 130 mmHg';
    }

    if (systolicNum <= diastolicNum) {
      newErrors.systolic = 'Systolic pressure must be higher than diastolic';
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
      const newReading: BPReading = {
        timestamp: formData.timestamp,
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic),
      };

      setReadings([...readings, newReading].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        systolic: '',
        diastolic: '',
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,Systolic (mmHg),Diastolic (mmHg)',
      ...readings.map(reading => 
        `${reading.timestamp},${reading.systolic},${reading.diastolic}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'blood-pressure-readings.csv';
    link.click();
  };

  const getBPCategory = (systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80) return 'text-green-500';
    if (systolic < 130 && diastolic < 80) return 'text-yellow-500';
    return 'text-red-500';
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
                  Systolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  value={formData.systolic}
                  onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="90-200 mmHg"
                />
                {errors.systolic && (
                  <p className="text-red-500 text-sm mt-1">{errors.systolic}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diastolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  value={formData.diastolic}
                  onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="60-130 mmHg"
                />
                {errors.diastolic && (
                  <p className="text-red-500 text-sm mt-1">{errors.diastolic}</p>
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
              <h2 className="text-xl font-semibold">Blood Pressure Chart</h2>
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
                  <YAxis domain={[40, 220]} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke="#ef4444"
                    name="Systolic"
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke="#3b82f6"
                    name="Diastolic"
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
                    <th className="text-left py-2">Systolic</th>
                    <th className="text-left py-2">Diastolic</th>
                    <th className="text-left py-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readings].reverse().map((reading, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2">
                        {new Date(reading.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2">{reading.systolic} mmHg</td>
                      <td className="py-2">{reading.diastolic} mmHg</td>
                      <td className={`py-2 ${getBPCategory(reading.systolic, reading.diastolic)}`}>
                        {reading.systolic < 120 && reading.diastolic < 80 && 'Normal'}
                        {reading.systolic >= 120 && reading.systolic < 130 && reading.diastolic < 80 && 'Elevated'}
                        {(reading.systolic >= 130 || reading.diastolic >= 80) && 'High'}
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