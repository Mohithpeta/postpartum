import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { CommunityIntro } from './CommunityIntro';
import GroupsList from './GroupsList';

export function Community() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onTopicChange={(topic) => console.log(topic)} />
        <div className="flex-1 px-8 py-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<div className="community-intro-wrapper" style={{justifyContent:"start"}}><CommunityIntro /></div>} />
              <Route path="/community/groups" element={<div className='community-intro-wrapper' style={{justifyContent:"start"}}><GroupsList /></div>} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}