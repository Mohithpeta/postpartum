import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, MessageCircle, User, Video, Activity,Radio } from 'lucide-react';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

function NavLink({ icon, label, to, isActive }: NavLinkProps) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
        isActive
          ? 'text-[#A32E76] bg-pink-50'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
}

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[#A32E76]">LifeCourse</h1>
      </div>
      <nav className="space-y-2">
        <NavLink
          icon={<Home className="w-5 h-5" />}
          label="Home"
          to="/home"
          isActive={currentPath === '/home'}
        />
        <NavLink
          icon={<Users className="w-5 h-5" />}
          label="LifeCourse Experts"
          to="/experts"
          isActive={currentPath === '/experts'}
        />
        <NavLink
        icon={<Video className="w-5 h-5" />}
        label="Videos"
        to="/videos"
        isActive={currentPath === '/videos'}
        />
      
        <NavLink
          icon={<Radio className="w-5 h-5" />}
          label="Live"
          to="/live"
          isActive={currentPath === '/live'}
        />
        <NavLink
          icon={<MessageCircle className="w-5 h-5" />}
          label="Community"
          to="/community"
          isActive={currentPath === '/community'}
        />
        <NavLink
          icon={<Activity className="w-5 h-5" />}
          label="Trackers"
          to="/trackers"
          isActive={currentPath === '/trackers'}
        />
        <NavLink
          icon={<User className="w-5 h-5" />}
          label="Profile"
          to="/profile"
          isActive={currentPath === '/profile'}
        />
      </nav>
    </div>
  );
}