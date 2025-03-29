import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { 
  Camera, 
  Edit2, 
  Mail, 
  Phone, 
  Calendar, 
  Settings, 
  Clock, 
  Users, 
  MessageSquare, 
  Award, 
  ChevronRight, 
  Bookmark, 
  Heart, 
  CheckCircle, 
  X 
} from 'lucide-react';

// **Tab Interface and Component**
interface TabProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ title, icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-3 px-4 rounded-lg transition-all relative ${
        active 
          ? 'bg-[#5E17EB] bg-opacity-10 text-[#5E17EB] font-semibold' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{title}</span>
      {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E17EB]" />}
    </button>
  );
};

// **Badge Component**
interface BadgeProps {
  text: string;
  onRemove?: () => void;
  editable?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ text, onRemove, editable = false }) => {
  return (
    <span className="px-3 py-1 bg-[#5E17EB] bg-opacity-10 text-[#5E17EB] rounded-full text-sm flex items-center">
      {text}
      {editable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 hover:text-[#4812c4] transition-colors focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

// **Input Component**
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChange, 
  type = "text",
  placeholder,
  icon,
  className = '',
  ...rest
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] outline-none transition ${icon ? 'pl-10' : ''} ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
};

// **Achievement Card Component**
interface AchievementProps {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const AchievementCard: React.FC<AchievementProps> = ({ title, date, description, icon }) => {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-2 rounded-full bg-[#5E17EB] bg-opacity-10 text-[#5E17EB]">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

// **Card Component**
interface CardProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, action, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

// **Stat Item Component**
interface StatItemProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
      <div className="p-2 rounded-full bg-[#5E17EB] bg-opacity-10 text-[#5E17EB]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

// **Main Profile Component**
export function Profile() {
  // State
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState({
    name: 'Sarah Anderson',
    role: 'New Parent',
    email: 'sarah.anderson@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '1990-05-15',
    location: 'San Francisco, CA',
    bio: 'First-time parent navigating the joys and challenges of motherhood. Passionate about fitness and nutrition. Looking to connect with other parents and experts.',
    joinDate: 'January 2024',
    interests: ['Pregnancy', 'Mental Health', 'Nutrition', 'Fitness', 'Parenting Tips'],
    skills: ['Yoga', 'Cooking', 'First Aid'],
    privacySettings: {
      showEmail: true,
      showPhone: true,
      notificationsEnabled: true,
      activityVisible: true,
    },
  });

  // Stats Data
  const stats = {
    sessionsAttended: 15,
    communityCalls: 8,
    questionsAsked: 23,
    resourcesAccessed: 47,
    expertConsultations: 5,
    groupsJoined: 3,
    savedContent: 12,
    completedCourses: 2,
  };

  // Activity Data
  const recentActivity = [
    {
      type: 'course',
      title: 'Completed "Postpartum Recovery Essentials"',
      date: 'March 15, 2025',
      description: 'You\'ve completed all 8 modules of this course.',
    },
    {
      type: 'question',
      title: 'Asked a question about sleep training',
      date: 'March 10, 2025',
      description: 'Your question received 5 responses from experts and community members.',
    },
    {
      type: 'event',
      title: 'Attended "Mental Health for New Parents" webinar',
      date: 'February 28, 2025',
      description: 'You actively participated in this 60-minute live session.',
    },
    {
      type: 'achievement',
      title: 'Earned "Engaged Learner" badge',
      date: 'February 20, 2025',
      description: 'Awarded for consistent participation in community discussions.',
    },
  ];

  // Achievements Data
  const achievements = [
    {
      title: 'Course Completer',
      date: 'March 15, 2025',
      description: 'Completed 2 full courses in maternal health',
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: 'Community Contributor',
      date: 'February 20, 2025',
      description: 'Posted 25+ helpful responses in community forums',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: 'Regular Attendee',
      date: 'January 30, 2025',
      description: 'Attended 10+ expert sessions in the last 3 months',
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  // **Handlers**
  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would send data to a server
    console.log('Profile saved:', profileData);
  };

  const handleCancelEdit = () => setIsEditing(false);

  const handleUpdateProfileData = (field: keyof typeof profileData, value: string | boolean | string[]) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddInterest = () => {
    setProfileData(prev => ({
      ...prev,
      interests: [...prev.interests, ''],
    }));
  };

  const handleUpdateInterest = (index: number, value: string) => {
    const updatedInterests = [...profileData.interests];
    updatedInterests[index] = value;
    handleUpdateProfileData('interests', updatedInterests);
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = profileData.interests.filter((_, i) => i !== index);
    handleUpdateProfileData('interests', updatedInterests);
  };

  const handleAddSkill = () => {
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const handleUpdateSkill = (index: number, value: string) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[index] = value;
    handleUpdateProfileData('skills', updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = profileData.skills.filter((_, i) => i !== index);
    handleUpdateProfileData('skills', updatedSkills);
  };

  // **Profile Completeness Calculation**
  const calculateProfileCompleteness = () => {
    let complete = 0;
    let total = 0;
    const basicFields = ['name', 'email', 'phone', 'birthday', 'location', 'bio'];
    basicFields.forEach(field => {
      total++;
      if (profileData[field as keyof typeof profileData]) complete++;
    });
    total += 2;
    if (profileData.interests.length > 0) complete++;
    if (profileData.skills.length > 0) complete++;
    return Math.round((complete / total) * 100);
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          placeholder="Search LifeCourse"
          onSearch={(q) => console.log('Searching for:', q)}
          onTopicChange={(topic) => console.log('Topic changed:', topic)}
        />
        
        <main className="flex-1 overflow-y-auto pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* **Profile Header** */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="h-32 bg-gradient-to-r from-[#5E17EB] to-[#8344FF] rounded-t-xl"></div>
              <div className="px-6 sm:px-8 pb-6 pt-0 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-end sm:space-x-5">
                  <div className="relative -mt-16 mb-4 sm:mb-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-[#5E17EB] text-white rounded-full shadow-md hover:bg-[#4812c4] transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={profileData.name}
                              onChange={(e) => handleUpdateProfileData('name', e.target.value)}
                              placeholder="Enter your name"
                              className="text-2xl font-bold text-gray-900 p-0 border-none focus:ring-0"
                              style={{ fontSize: '1.5rem', lineHeight: '2rem' }}
                            />
                            <Input
                              value={profileData.role}
                              onChange={(e) => handleUpdateProfileData('role', e.target.value)}
                              placeholder="Enter your role"
                              className="text-gray-600 p-0 border-none focus:ring-0"
                              style={{ fontSize: '1rem' }}
                            />
                          </div>
                        ) : (
                          <>
                            <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                            <p className="text-gray-600 mt-1">{profileData.role}</p>
                          </>
                        )}
                      </div>
                      {isEditing ? (
                        <div className="flex space-x-2 mt-4 sm:mt-0">
                          <button
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4812c4] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E17EB]"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E17EB]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleEditProfile}
                          className="mt-4 sm:mt-0 px-4 py-2 flex items-center space-x-2 text-[#5E17EB] border border-[#5E17EB] rounded-lg hover:bg-[#5E17EB] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E17EB]"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </button>
                      )}
                    </div>
                    <div className="mt-4">
                      {isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Email"
                            value={profileData.email}
                            onChange={(e) => handleUpdateProfileData('email', e.target.value)}
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                          />
                          <Input
                            label="Phone"
                            value={profileData.phone}
                            onChange={(e) => handleUpdateProfileData('phone', e.target.value)}
                            type="tel"
                            icon={<Phone className="w-4 h-4" />}
                          />
                          <Input
                            label="Birthday"
                            value={profileData.birthday}
                            onChange={(e) => handleUpdateProfileData('birthday', e.target.value)}
                            type="date"
                          />
                          <Input
                            label="Location"
                            value={profileData.location}
                            onChange={(e) => handleUpdateProfileData('location', e.target.value)}
                            placeholder="City, State"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Member since {profileData.joinDate}</span>
                          </div>
                          {profileData.privacySettings.showEmail && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              <span>{profileData.email}</span>
                            </div>
                          )}
                          {profileData.privacySettings.showPhone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              <span>{profileData.phone}</span>
                            </div>
                          )}
                          {profileData.birthday && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Birthday: {profileData.birthday}</span>
                            </div>
                          )}
                          {profileData.location && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Location: {profileData.location}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* **Profile Content** */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* **Left Sidebar** */}
              <div className="lg:col-span-1 space-y-6">
                {/* Profile Completeness */}
                <Card 
                  title="Profile Completeness" 
                  icon={<CheckCircle className="w-5 h-5 text-[#5E17EB]" />}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{profileCompleteness}% Complete</span>
                        <span className="text-sm font-medium text-[#5E17EB]">{profileCompleteness}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#5E17EB] h-2.5 rounded-full transition-all duration-300" 
                          style={{ width: `${profileCompleteness}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Complete your profile for better recommendations.
                    </p>
                    {profileCompleteness < 100 && (
                      <button 
                        onClick={handleEditProfile}
                        className="text-sm text-[#5E17EB] font-medium hover:underline flex items-center"
                      >
                        Complete Now <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card 
                  title="Activity Stats" 
                  icon={<Clock className="w-5 h-5 text-[#5E17EB]" />}
                >
                  <div className="space-y-1 divide-y divide-gray-100">
                    <StatItem label="Sessions Attended" value={stats.sessionsAttended} icon={<Users className="w-4 h-4" />} />
                    <StatItem label="Community Posts" value={stats.communityCalls} icon={<MessageSquare className="w-4 h-4" />} />
                    <StatItem label="Questions Asked" value={stats.questionsAsked} icon={<MessageSquare className="w-4 h-4" />} />
                    <StatItem label="Resources Accessed" value={stats.resourcesAccessed} icon={<Bookmark className="w-4 h-4" />} />
                    <StatItem label="Expert Consultations" value={stats.expertConsultations} icon={<Users className="w-4 h-4" />} />
                  </div>
                </Card>

                {/* Interests */}
                <Card 
                  title="Interests" 
                  icon={<Heart className="w-5 h-5 text-[#5E17EB]" />}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      {profileData.interests.map((interest, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={interest}
                            onChange={(e) => handleUpdateInterest(index, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] outline-none transition"
                            placeholder="Enter interest"
                          />
                          <button
                            onClick={() => handleRemoveInterest(index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddInterest}
                        className="text-sm text-[#5E17EB] hover:underline"
                      >
                        + Add Interest
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} text={interest} />
                      ))}
                    </div>
                  )}
                </Card>

                {/* Skills */}
                <Card 
                  title="Skills" 
                  icon={<Award className="w-5 h-5 text-[#5E17EB]" />}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      {profileData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleUpdateSkill(index, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] outline-none transition"
                            placeholder="Enter skill"
                          />
                          <button
                            onClick={() => handleRemoveSkill(index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddSkill}
                        className="text-sm text-[#5E17EB] hover:underline"
                      >
                        + Add Skill
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} text={skill} />
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              {/* **Main Content** */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex overflow-x-auto space-x-2 p-2">
                    <Tab
                      title="Overview"
                      icon={<Users className="w-4 h-4" />}
                      active={activeTab === "overview"}
                      onClick={() => setActiveTab("overview")}
                    />
                    <Tab
                      title="Activity"
                      icon={<Clock className="w-4 h-4" />}
                      active={activeTab === "activity"}
                      onClick={() => setActiveTab("activity")}
                    />
                    <Tab
                      title="Achievements"
                      icon={<Award className="w-4 h-4" />}
                      active={activeTab === "achievements"}
                      onClick={() => setActiveTab("achievements")}
                    />
                    <Tab
                      title="Settings"
                      icon={<Settings className="w-4 h-4" />}
                      active={activeTab === "settings"}
                      onClick={() => setActiveTab("settings")}
                    />
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <>
                    {/* About */}
                    <Card title="About">
                      {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => handleUpdateProfileData('bio', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] outline-none transition"
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="text-gray-700 whitespace-pre-line">{profileData.bio}</p>
                      )}
                    </Card>

                    {/* Recent Activity */}
                    <Card 
                      title="Recent Activity" 
                      icon={<Clock className="w-5 h-5 text-[#5E17EB]" />}
                      action={
                        <button className="text-sm text-[#5E17EB] hover:underline">
                          View All
                        </button>
                      }
                    >
                      <div className="space-y-4">
                        {recentActivity.slice(0, 3).map((activity, index) => (
                          <div key={index} className="flex space-x-3">
                            <div className="flex-shrink-0">
                              {activity.type === 'course' && (
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <CheckCircle className="w-5 h-5" />
                                </div>
                              )}
                              {activity.type === 'question' && (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  <MessageSquare className="w-5 h-5" />
                                </div>
                              )}
                              {activity.type === 'event' && (
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                  <Users className="w-5 h-5" />
                                </div>
                              )}
                              {activity.type === 'achievement' && (
                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                  <Award className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </>
                )}

                {activeTab === "activity" && (
                  <Card title="All Activity">
                    <div className="space-y-6">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex space-x-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="flex-shrink-0">
                            {activity.type === 'course' && (
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                            )}
                            {activity.type === 'question' && (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <MessageSquare className="w-5 h-5" />
                              </div>
                            )}
                            {activity.type === 'event' && (
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Users className="w-5 h-5" />
                              </div>
                            )}
                            {activity.type === 'achievement' && (
                              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <Award className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {activeTab === "achievements" && (
                  <Card title="Your Achievements">
                    <div className="grid grid-cols-1 gap-4">
                      {achievements.map((achievement, index) => (
                        <AchievementCard
                          key={index}
                          title={achievement.title}
                          date={achievement.date}
                          description={achievement.description}
                          icon={achievement.icon}
                        />
                      ))}
                    </div>
                  </Card>
                )}

                {activeTab === "settings" && (
                  <Card title="Privacy Settings">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Email to Community</h3>
                          <p className="text-sm text-gray-600">Allow others to see your email address</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={profileData.privacySettings.showEmail}
                            onChange={() => {
                              setProfileData(prev => ({
                                ...prev,
                                privacySettings: { ...prev.privacySettings, showEmail: !prev.privacySettings.showEmail },
                              }));
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E17EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Show Phone Number</h3>
                          <p className="text-sm text-gray-600">Allow others to see your phone number</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={profileData.privacySettings.showPhone}
                            onChange={() => {
                              setProfileData(prev => ({
                                ...prev,
                                privacySettings: { ...prev.privacySettings, showPhone: !prev.privacySettings.showPhone },
                              }));
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E17EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive email updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={profileData.privacySettings.notificationsEnabled}
                            onChange={() => {
                              setProfileData(prev => ({
                                ...prev,
                                privacySettings: { ...prev.privacySettings, notificationsEnabled: !prev.privacySettings.notificationsEnabled },
                              }));
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E17EB]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Activity Visibility</h3>
                          <p className="text-sm text-gray-600">Allow others to see your activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={profileData.privacySettings.activityVisible}
                            onChange={() => {
                              setProfileData(prev => ({
                                ...prev,
                                privacySettings: { ...prev.privacySettings, activityVisible: !prev.privacySettings.activityVisible },
                              }));
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5E17EB]"></div>
                        </label>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}