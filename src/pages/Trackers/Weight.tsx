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

interface WeightReading {
  timestamp: string;
  weight: number;
  unit: 'kg' | 'lbs';
}

interface FormData {
  weight: string;
  unit: 'kg' | 'lbs';
  timestamp: string;
}

export function Weight() {
  const [readings, setReadings] = useState<WeightReading[]>([
    { timestamp: '2024-03-10 09:00', weight: 70.5, unit: 'kg' },
    { timestamp: '2024-03-11 09:30', weight: 70.2, unit: 'kg' },
    { timestamp: '2024-03-12 10:00', weight: 70.3, unit: 'kg' },
  ]);

  const [formData, setFormData] = useState<FormData>({
    weight: '',
    unit: 'kg',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [displayUnit, setDisplayUnit] = useState<'kg' | 'lbs'>('kg');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [zoomLevel, setZoomLevel] = useState(1);

  const convertWeight = (weight: number, fromUnit: 'kg' | 'lbs', toUnit: 'kg' | 'lbs'): number => {
    if (fromUnit === toUnit) return weight;
    return fromUnit === 'kg' ? weight * 2.20462 : weight / 2.20462;
  };

  const getDisplayWeight = (reading: WeightReading): number => {
    return Number(convertWeight(reading.weight, reading.unit, displayUnit).toFixed(1));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const weightNum = parseFloat(formData.weight);
    const timestamp = new Date(formData.timestamp);

    if (!formData.weight || isNaN(weightNum)) {
      newErrors.weight = 'Please enter a valid weight';
    } else if (formData.unit === 'kg' && (weightNum < 20 || weightNum > 300)) {
      newErrors.weight = 'Weight must be between 20 and 300 kg';
    } else if (formData.unit === 'lbs' && (weightNum < 44 || weightNum > 660)) {
      newErrors.weight = 'Weight must be between 44 and 660 lbs';
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
      const newReading: WeightReading = {
        timestamp: formData.timestamp,
        weight: parseFloat(formData.weight),
        unit: formData.unit,
      };

      setReadings([...readings, newReading].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        weight: '',
        unit: formData.unit,
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,Weight (kg),Weight (lbs)',
      ...readings.map(reading => {
        const weightKg = reading.unit === 'kg' ? reading.weight : convertWeight(reading.weight, 'lbs', 'kg');
        const weightLbs = reading.unit === 'lbs' ? reading.weight : convertWeight(reading.weight, 'kg', 'lbs');
        return `${reading.timestamp},${weightKg.toFixed(1)},${weightLbs.toFixed(1)}`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'weight-readings.csv';
    link.click();
  };

  const chartData = readings.map(reading => ({
    timestamp: reading.timestamp,
    weight: getDisplayWeight(reading),
  }));

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
                  Weight
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                    placeholder={formData.unit === 'kg' ? '20-300 kg' : '44-660 lbs'}
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as 'kg' | 'lbs' })}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
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
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Weight Chart</h2>
                <select
                  value={displayUnit}
                  onChange={(e) => setDisplayUnit(e.target.value as 'kg' | 'lbs')}
                  className="p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                >
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
                </select>
              </div>
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
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    label={{ 
                      value: `Weight (${displayUnit})`, 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value: number) => [`${value.toFixed(1)} ${displayUnit}`, 'Weight']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#A32E76"
                    name={`Weight (${displayUnit})`}
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
                    <th className="text-left py-2">Weight (kg)</th>
                    <th className="text-left py-2">Weight (lbs)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readings].reverse().map((reading, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2">
                        {new Date(reading.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2">
                        {(reading.unit === 'kg' ? reading.weight : convertWeight(reading.weight, 'lbs', 'kg')).toFixed(1)} kg
                      </td>
                      <td className="py-2">
                        {(reading.unit === 'lbs' ? reading.weight : convertWeight(reading.weight, 'kg', 'lbs')).toFixed(1)} lbs
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