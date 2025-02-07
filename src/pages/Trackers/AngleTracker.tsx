import { useState, useRef } from 'react';
import { ArrowLeft, Download, Plus, ZoomIn, ZoomOut, Upload } from 'lucide-react';
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

interface AngleReading {
  timestamp: string;
  angle: number;
  sineValue: number;
}

interface FormData {
  angle: string;
  unit: 'degrees' | 'radians';
  timestamp: string;
}

const AngleTracker = () => {
  const [readings, setReadings] = useState<AngleReading[]>([
    { timestamp: '2024-03-10 09:00', angle: 0, sineValue: 0 },
    { timestamp: '2024-03-10 09:30', angle: 45, sineValue: 0.7071 },
    { timestamp: '2024-03-10 10:00', angle: 90, sineValue: 1 },
    { timestamp: '2024-03-10 10:30', angle: 135, sineValue: 0.7071 },
    { timestamp: '2024-03-10 11:00', angle: 180, sineValue: 0 },
    { timestamp: '2024-03-10 11:30', angle: 225, sineValue: -0.7071 },
    { timestamp: '2024-03-10 12:00', angle: 270, sineValue: -1 },
    { timestamp: '2024-03-10 12:30', angle: 315, sineValue: -0.7071 },
    { timestamp: '2024-03-10 13:00', angle: 360, sineValue: 0 },
  ]);

  const [formData, setFormData] = useState<FormData>({
    angle: '',
    unit: 'degrees',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const angleNum = parseFloat(formData.angle);
    const timestamp = new Date(formData.timestamp);

    if (!formData.angle || isNaN(angleNum)) {
      newErrors.angle = 'Please enter a valid number';
    } else if (formData.unit === 'degrees' && (angleNum < -360 || angleNum > 360)) {
      newErrors.angle = 'Angle must be between -360° and 360°';
    } else if (formData.unit === 'radians' && (angleNum < -2 * Math.PI || angleNum > 2 * Math.PI)) {
      newErrors.angle = 'Angle must be between -2π and 2π radians';
    }

    if (timestamp > new Date()) {
      newErrors.timestamp = 'Future timestamps are not allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSineValue = (angle: number, unit: 'degrees' | 'radians'): number => {
    const angleInRadians = unit === 'degrees' ? (angle * Math.PI) / 180 : angle;
    return Math.sin(angleInRadians);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const angleNum = parseFloat(formData.angle);
      const newReading: AngleReading = {
        timestamp: formData.timestamp,
        angle: angleNum,
        sineValue: calculateSineValue(angleNum, formData.unit),
      };

      setReadings([...readings, newReading].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ));

      setFormData({
        angle: '',
        unit: formData.unit,
        timestamp: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        
        const newReadings: AngleReading[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length >= 2) {
            const angle = parseFloat(values[1]);
            const unit = values[2]?.trim().toLowerCase() === 'radians' ? 'radians' : 'degrees';
            newReadings.push({
              timestamp: values[0],
              angle: angle,
              sineValue: calculateSineValue(angle, unit),
            });
          }
        }

        if (newReadings.length > 0) {
          setReadings([...readings, ...newReadings].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          ));
        }
      };
      reader.readAsText(file);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      'Timestamp,Angle,Unit,Sine Value',
      ...readings.map(reading => 
        `${reading.timestamp},${reading.angle},${formData.unit},${reading.sineValue}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'angle-readings.csv';
    link.click();
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
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Angle
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={formData.angle}
                    onChange={(e) => setFormData({ ...formData, angle: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                    placeholder={formData.unit === 'degrees' ? "-360 to 360" : "-2π to 2π"}
                    step="any"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as 'degrees' | 'radians' })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#A32E76] focus:border-transparent"
                  >
                    <option value="degrees">Degrees</option>
                    <option value="radians">Radians</option>
                  </select>
                </div>
                {errors.angle && (
                  <p className="text-red-500 text-sm mt-1">{errors.angle}</p>
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import CSV
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Sine Wave Chart</h2>
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
                  <YAxis 
                    domain={[-1.2, 1.2]}
                    label={{ value: 'Sine Value', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value: number, name: string) => [
                      value.toFixed(4),
                      name === 'angle' ? `Angle (${formData.unit})` : 'Sine Value'
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="angle"
                    stroke="#ef4444"
                    name="Angle"
                    hide
                  />
                  <Line
                    type="monotone"
                    dataKey="sineValue"
                    stroke="#3b82f6"
                    name="Sine Value"
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Historical Readings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Timestamp</th>
                    <th className="text-left py-2">Angle</th>
                    <th className="text-left py-2">Sine Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readings].reverse().map((reading, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2">
                        {new Date(reading.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2">
                        {reading.angle} {formData.unit}
                      </td>
                      <td className="py-2">{reading.sineValue.toFixed(4)}</td>
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
};

export default AngleTracker;