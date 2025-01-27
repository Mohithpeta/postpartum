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

interface AnemiaReading {
  timestamp: string;
  hemoglobin: number;
  cbc: number; // CBC as a new metric
}

interface FormData {
  hemoglobin: string;
  cbc: string; // CBC input field
  timestamp: string;
}

export function Anemia() {
  const [readings, setReadings] = useState<AnemiaReading[]>([
    { timestamp: '2024-03-10 09:00', hemoglobin: 13.5, cbc: 4.5 }, // Example CBC values
    { timestamp: '2024-03-11 09:30', hemoglobin: 12.8, cbc: 4.4 },
    { timestamp: '2024-03-12 10:00', hemoglobin: 13.2, cbc: 4.6 },
  ]);

  const [formData, setFormData] = useState<FormData>({
    hemoglobin: '',
    cbc: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState<'hemoglobin' | 'cbc'>('hemoglobin');

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const hemoglobinNum = parseFloat(formData.hemoglobin);
    const cbcNum = parseFloat(formData.cbc);
    const timestamp = new Date(formData.timestamp);

    if (!formData.hemoglobin || hemoglobinNum < 5 || hemoglobinNum > 20) {
      newErrors.hemoglobin = 'Hemoglobin must be between 5 and 20 g/dL';
    }

    if (!formData.cbc || cbcNum < 3.5 || cbcNum > 7.5) {
      newErrors.cbc = 'CBC must be between 3.5 and 7.5 million cells/mcL';
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
      const newReading: AnemiaReading = {
        timestamp: formData.timestamp,
        hemoglobin: parseFloat(formData.hemoglobin),
        cbc: parseFloat(formData.cbc),
      };

      setReadings([...readings, newReading].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        hemoglobin: '',
        cbc: '',
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,Hemoglobin (g/dL),CBC (million cells/mcL)',
      ...readings.map(reading =>
        `${reading.timestamp},${reading.hemoglobin},${reading.cbc}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'anemia-readings.csv';
    link.click();
  };

  const getAnemiaStatus = (hemoglobin: number, cbc: number) => {
    if (hemoglobin < 12) {
      return { status: 'Anemia', color: 'text-red-500' };
    }
    return { status: 'Normal', color: 'text-green-500' };
  };

  const metricInfo = {
    hemoglobin: { color: '#ef4444', name: 'Hemoglobin', unit: 'g/dL', range: '12-16' },
    cbc: { color: '#3b82f6', name: 'CBC', unit: 'million cells/mcL', range: '3.5-7.5' },
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
                  Hemoglobin (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.hemoglobin}
                  onChange={(e) => setFormData({ ...formData, hemoglobin: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="5-20 g/dL"
                />
                {errors.hemoglobin && (
                  <p className="text-red-500 text-sm mt-1">{errors.hemoglobin}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CBC (million cells/mcL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.cbc}
                  onChange={(e) => setFormData({ ...formData, cbc: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  placeholder="3.5-7.5 million cells/mcL"
                />
                {errors.cbc && (
                  <p className="text-red-500 text-sm mt-1">{errors.cbc}</p>
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
              <h2 className="text-xl font-semibold">Anemia Metrics Chart</h2>
              <div className="flex gap-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as typeof selectedMetric)}
                  className="p-2 border rounded-md"
                >
                  <option value="hemoglobin">Hemoglobin</option>
                  <option value="cbc">CBC</option>
                </select>
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
                <LineChart data={readings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    label={{
                      value: `${metricInfo[selectedMetric].name} (${metricInfo[selectedMetric].unit})`,
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value, name) => {
                      const metric = metricInfo[name as keyof typeof metricInfo];
                      return [
                        `${value} ${metric?.unit ?? ''}`,
                        metric?.name ?? '',
                      ];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={metricInfo[selectedMetric].color}
                    name={metricInfo[selectedMetric].name}
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
                    <th className="text-left py-2">Hemoglobin</th>
                    <th className="text-left py-2">CBC</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readings].reverse().map((reading, index) => {
                    const status = getAnemiaStatus(reading.hemoglobin, reading.cbc);
                    return (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">
                          {new Date(reading.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2">{reading.hemoglobin} g/dL</td>
                        <td className="py-2">{reading.cbc} million cells/mcL</td>
                        <td className={`py-2 ${status.color}`}>{status.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
