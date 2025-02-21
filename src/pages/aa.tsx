import React from 'react';
import { Calendar, ChevronRight, ChevronDown, Heart, HelpCircle, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MilestoneProps {
  childName: string;
  childAge: string;
  weekNumber: number;
  milestonesAnswered: number;
  totalMilestones: number;
}

export const MilestoneTracker: React.FC<MilestoneProps> = ({
  childName,
  childAge,
  weekNumber,
  milestonesAnswered,
  totalMilestones
}) => {
  const navigate = useNavigate();
  
  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  };

  const handleMilestoneClick = () => {
    navigate('/trackers/milestone-checklist');
  };

  return (
    <div className="flex gap-8">
      {/* Left Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 mb-4">
          {/* Child Info Card */}
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-purple-100">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 text-sm font-medium">
                {childName[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{childName}</p>
              <p className="text-xs text-gray-500">{childAge}</p>
            </div>
          </div>

          {/* Add Child Button */}
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm flex items-center gap-2">
            <span>+</span>
            Add Child
          </button>
        </div>

        {/* Milestone Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Milestone for {childName}</h2>
          <button 
            onClick={handleMilestoneClick}
            className="w-full text-left"
          >
            <div className="bg-purple-50 p-4 rounded-lg mb-6 hover:bg-purple-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Milestone Checklist {weekNumber}st week</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-24 bg-purple-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(milestonesAnswered/totalMilestones) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      {milestonesAnswered}/{totalMilestones} Milestones Answered
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </button>

          <h2 className="text-lg font-semibold mb-4">For {childName}</h2>
          
          {/* Info Cards Grid */}
<div className="grid grid-cols-2 gap-4">
            {/* Milestone Summary Card */}
            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
              <h3 className="font-medium">Milestone Summary</h3>
              <button className="text-blue-600 text-sm mt-1">View Summary</button>
              </div>
            </div>

            {/* Expert Tips Card */}
            <div className="flex items-start gap-4 bg-pink-50 p-4 rounded-lg">
              <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div>
              <h3 className="font-medium">Expert Tips & Guidance</h3>
              <button className="text-pink-600 text-sm mt-1">View Tips & Guidance</button>
              </div>
            </div>

            {/* Nutrition Card */}
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <div>
              <h3 className="font-medium">Nutrition</h3>
              <button className="text-purple-600 text-sm mt-1">View Nutrition</button>
              </div>
            </div>

            {/* FAQ Card */}
            <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
              <h3 className="font-medium">Common FAQ's</h3>
              <button className="text-yellow-600 text-sm mt-1">View FAQ's</button>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Calendar Section */}
            <div className="w-80">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">January 2025</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
      
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-sm text-gray-500">{day}</div>
                  ))}
                </div>
      
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day) => (
                    <button
                      key={day}
                      className={`p-2 text-sm rounded-lg hover:bg-purple-50 
                        ${day === 19 ? 'bg-purple-600 text-white' : 'text-gray-700'}
                        ${day === 28 ? 'relative' : ''}`}
                    >
                      {day}
                      {day === 28 && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-purple-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
      
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Weekly milestone checklist
                </div>
              </div>
            </div>
    </div>
  );
};

export default MilestoneTracker;