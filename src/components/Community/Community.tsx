import { Routes, Route, useNavigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import GroupsList from './GroupsList';
import { useState } from 'react';
import { Group } from './types';

export function Community() {
  const navigate = useNavigate();
  const [searchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const groups: Group[] = [
    {
      name: 'Postpartum Hypertension',
      members: 156,
      description: 'Join the Postpartum Hypertension Community to connect with experts and peers.',
      category: 'Hypertension',
    },
    {
      name: 'Pregnancy Care',
      members: 200,
      description: 'A community for pregnant mothers to discuss health and wellness topics.',
      category: 'Pregnancy',
    },
    // Add more groups here...
  ];

  // Filtering groups based on search query and selected topic
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || group.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onTopicChange={setSelectedTopic} />
        <div className="flex-1 px-8 py-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route
                index
                element={
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
                      <h2 className="text-2xl font-bold mb-8 text-[#a32e76]">
                        Lifecourse Hypertension Care
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Join our community dedicated to supporting individuals managing hypertension 
                        throughout different life stages. Connect with experts, share experiences, 
                        and access valuable resources.
                      </p>
                      <button
                        onClick={() => navigate('/community/groups')}
                        className="px-6 py-3 bg-[#a32e76] text-white font-medium rounded-full 
                                     hover:bg-[#8e2968] transition-colors"
                      >
                        Join Community
                      </button>
                    </div>
                  </div>
                }
              />
              <Route
                path="groups"
                element={<GroupsList groups={filteredGroups} />}
              />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
