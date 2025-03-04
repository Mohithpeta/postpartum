import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Link } from "react-router-dom";

const ExpertTipsGuidance: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header onTopicChange={(topic: string) => console.log(topic)} />
        <div className="p-6">
          {/* Banner */}
          <div className="bg-pink-200 text-center py-10 text-xl font-semibold text-pink-700 relative">
            Expert Tips & Guidance
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"><Link to="/trackers">
              ←</Link>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-3 mt-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Week 1
            </button>
            <button className="border px-4 py-2 rounded-lg">Week 2</button>
            <button className="border px-4 py-2 rounded-lg">Week 3</button>
            <button className="border px-4 py-2 rounded-lg">Week 4</button>
            <button className="border px-4 py-2 rounded-lg">Week 5</button>
          </div>

          {/* Content */}
          <div className="mt-6 bg-white p-4 shadow-md rounded-lg" style={{height: '400px',width: '600px'}}>
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400"
              alt="Doctor"
              className="rounded-lg w-full" 
            />
            <h2 className="text-lg font-semibold mt-4">
              10 Practical tips for handling baby in Week 1
            </h2>
            <div className="flex items-center mt-2">
              <span className="font-semibold">Dr. Raj Kumar</span>
              <span className="text-gray-500 ml-2">✔ 110 Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertTipsGuidance;
