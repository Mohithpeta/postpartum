import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import GroupsList from "./GroupsList";

import { Group } from "./types";
import { FiMoreVertical } from "react-icons/fi"; // Icon for menu
import { FaArrowRight } from "react-icons/fa"; // Arrow icon
import logo1 from "../../assets/1.png";
import logo2 from "../../assets/2.png";
import logo3 from "../../assets/3.png";
import logo4 from "../../assets/4.png";
import logo5 from "../../assets/5.png";

export function Community() {
  const navigate = useNavigate();

  const groups: Group[] = [
    {
      name: "Community Meetup",
      category: "Hypertension",
      image: logo1,
    },
    {
      name: "Pregnancy Care",
      category: "",
      image: logo2,
    },
    {
      name: "Pregnancy Care",
      category: "",
      image: logo3,
    },
    {
      name: "Pregnancy Care",
      category: "",
      image: logo4,
    },
    {
      name: "Pregnancy Care",
      category: "",
      image: logo5,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onTopicChange={(topic: string) => console.log(topic)} />
        <div className="flex-1 px-8 py-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-[#5e17eb]">Community for you</h1>
            <Routes>
              <Route
                index
                element={
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] flex border border-gray-200 relative">
                      {/* Community Image */}
                      <img
                        src={logo2}
                        alt="Community"
                        className="rounded-lg object-cover w-[100px] h-[100px] mr-4"
                      />

                      {/* Community Details */}
                      <div className="flex-1">
                        {/* Menu Icon */}
                        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                          <FiMoreVertical size={20} />
                        </button>

                        <h2 className="text-lg font-bold text-gray-900">LifeCourse Hypertension Care</h2>
                        <p className="text-gray-600 text-sm font-medium">156 Members</p>

                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                          Join the Postpartum Hypertension Community to connect with experts and peers, access tailored
                          resources, and prepare for a healthy pregnancy journey.
                        </p>

                        {/* Join Button */}
                        <button
                          onClick={() => navigate("/community/groups")}
                          className="mt-4 flex items-center justify-center px-4 py-1 border-2 border-[#5e17eb] 
                                   text-[#5e17eb] font-medium rounded-full hover:bg-[#5e17eb] hover:text-white 
                                   transition-colors text-sm"
                        >
                          Join Community <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="groups" element={<GroupsList groups={groups} />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
