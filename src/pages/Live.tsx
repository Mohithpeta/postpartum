import { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export function Live() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  type Session = {
    title: string;
    doctor: string;
    watching?: string;
    views?: string;
    streamedTime?: string;
    scheduledTime?: string;
    image: string;
    status: 'live' | 'recent' | 'upcoming';
  };

  const liveSessions: Session[] = [
    {
      title: "LIVE | 10 Practical tips for managing postpartum Hypertension",
      doctor: "Dr. Anjali Kumar",
      watching: "35 Watching",
      image: "/api/placeholder/640/360",
      status: "live"
    }
  ];

  const recentSessions: Session[] = [
    {
      title: "10 Practical tips for managing postpartum Hypertension",
      doctor: "Dr. Anjali Kumar",
      views: "100 Views",
      streamedTime: "Streamed 2 hours ago",
      image: "/api/placeholder/640/360",
      status: "recent"
    },
    {
      title: "Managing Gestational Diabetes",
      doctor: "Dr. Sarah Smith",
      views: "150 Views",
      streamedTime: "Streamed 4 hours ago",
      image: "/api/placeholder/640/360",
      status: "recent"
    }
  ];

  const upcomingSessions: Session[] = [
    {
      title: "Advanced techniques in postpartum care",
      doctor: "Dr. Anjali Kumar",
      watching: "35 Waiting",
      scheduledTime: "Scheduled for 28/01/25 | 5:00 PM",
      image: "/api/placeholder/640/360",
      status: "upcoming"
    },
    {
      title: "Latest developments in maternal health",
      doctor: "Dr. James Wilson",
      watching: "42 Waiting",
      scheduledTime: "Scheduled for 29/01/25 | 3:00 PM",
      image: "/api/placeholder/640/360",
      status: "upcoming"
    }
  ];

  const filterSessions = (sessions: Session[]): Session[] => {
    if (!searchQuery) return sessions;
    
    return sessions.filter((session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredSessions = () => {
    switch (activeTab) {
      case 'live':
        return filterSessions(liveSessions);
      case 'recent':
        return filterSessions(recentSessions);
      case 'upcoming':
        return filterSessions(upcomingSessions);
      default:
        return filterSessions([...liveSessions, ...recentSessions, ...upcomingSessions]);
    }
  };

  const CategoryButton = ({ category, label }: { category: string; label: string }) => (
    <button
      onClick={() => setActiveTab(category)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        activeTab === category
          ? 'bg-[#5e17eb] text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const SessionCard = ({ session }: { session: Session }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full">
      <div className="relative w-full">
        <div className="w-full aspect-video">
          <img
            src={session.image}
            alt={session.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        {session.status === 'live' && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold">
            LIVE
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="/api/placeholder/32/32"
            alt={session.doctor}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{session.title}</h3>
            <p className="text-sm text-gray-600">{session.doctor}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {'watching' in session ? session.watching : session.views}
          </span>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              session.status === 'live'
                ? 'bg-[#5e17eb] text-white'
                : session.status === 'upcoming'
                ? 'border border-[#5e17eb] text-[#5e17eb]'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {session.status === 'live' ? 'Watch Live →' :
             session.status === 'upcoming' ? 'Notify Me →' : 'View →'}
          </button>
        </div>
        {'streamedTime' in session && (
          <p className="text-xs text-gray-400 mt-2">{session.streamedTime}</p>
        )}
        {'scheduledTime' in session && (
          <p className="text-xs text-gray-400 mt-2">{session.scheduledTime}</p>
        )}
      </div>
    </div>
  );

  const renderSessionSection = (title: string, sessions: Session[]) => {
    const filteredSessions = filterSessions(sessions);
    if (filteredSessions.length === 0) return null;

    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session, index) => (
            <SessionCard key={`${session.status}-${index}`} session={session} />
          ))}
        </div>
        {title === 'Recent Live' && filteredSessions.length > 0 && (
          <button className="mt-6 text-[#5e17eb] text-sm font-semibold block mx-auto">
            Show more recent live ▼
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <Header onSearch={setSearchQuery} onTopicChange={() => {}} />
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex space-x-4">
              <CategoryButton category="all" label="All" />
              <CategoryButton category="live" label="Live Now" />
              <CategoryButton category="recent" label="Recent Live" />
              <CategoryButton category="upcoming" label="Upcoming Live" />
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-12">
            {getFilteredSessions().length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No sessions found matching "{searchQuery}"</p>
              </div>
            ) : (
              <>
                {(activeTab === 'all' || activeTab === 'live') && 
                  renderSessionSection('Live Now', liveSessions)}
                {(activeTab === 'all' || activeTab === 'recent') && 
                  renderSessionSection('Recent Live', recentSessions)}
                {(activeTab === 'all' || activeTab === 'upcoming') && 
                  renderSessionSection('Upcoming Live', upcomingSessions)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Live;