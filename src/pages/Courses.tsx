import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Verified, 
  Lock, 
  X, 
  Download, 
  ThumbsUp,
  CheckCircle,

} from 'lucide-react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const CoursesPage = () => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [isPremiumContent, setIsPremiumContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);

  const courseData = {
    title: "Managing Postpartum Hypertension: A Comprehensive Guide",
    price: "2000",
    instructor: { name: "Life Course", verified: true },
    stats: { views: "2.6k", lastUpdated: "Jan 10 2025" },
    instructors: [
      { name: "Dr. Aditi Sharma", title: "MBBS, MD (Cardiology)", type: "Content" },
      { name: "Dr. Meera Jain", title: "PhD (Hypertension Specialist)", type: "Video" },
      { name: "Dr. Ravi Patel", title: "MD (Obstetrics & Gynecology)", type: "Content" }
    ],
    lessons: [
      { id: 1, title: "Managing postpartum hypertension: A guide", duration: "02:05:00", status: "Free to watch", thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" },
      { id: 2, title: "Intro to Postpartum Hypertension", duration: "02:15:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' },
      { id: 3, title: "Understanding the Risk factors", duration: "01:45:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
      { id: 4, title: "Recognizing the Symptoms", duration: "02:00:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400' },
      { id: 5, title: "Screening and Diagnosis", duration: "01:30:00", status: "Pay to watch", thumbnail:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
      { id: 6, title: "Treatment Options: Medications and Beyond", duration: "02:30:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400' },
      { id: 7, title: "Diet and Nutrition for a Healthy Heart", duration: "01:45:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' },
      { id: 8, title: "Tracking Your Progress", duration: "01:15:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'},
      { id: 9, title: "Long-term Care and Prevention", duration: "02:00:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
      { id: 10, title: "Managing Hypertension with Tools & Resources", duration: "01:30:00", status: "Pay to watch", thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' }
    ]
  };

  // Premium Upgrade Popup
  const PremiumUpgradeModal = () => {
    const [showQRCode, setShowQRCode] = useState(false);

    const perks = [
      'Access to this course for lifetime',
      'Download courses & Videos to watch offline',
      'Chat with experienced doctors and specialists via the community message board',
      'Be the first to explore and use newly launched features and updates',
      'Enjoy faster responses to your queries from the support team'
    ];

    if (showQRCode) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden"
          >
            <button
              onClick={() => {
                setShowPaymentFlow(false);
                setShowQRCode(false);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <h2 className="text-center text-xl font-medium mb-4">Checkout</h2>
              <div className="text-center mb-4">
                Upgrading Premium for ₹ 2000
              </div>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="text-center mb-4">UPI QR code</div>
                <img src="/api/placeholder/200/200" alt="QR Code" className="mx-auto mb-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ 2000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹ 500</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹ 2500</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                By continuing you verify that you are agreeing to the terms & conditions LifeCourse.
                <span className="text-purple-600 cursor-pointer ml-1">Learn more...</span>
              </div>

              <button
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
              >
                Pay Now →
              </button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    return showPaymentFlow && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden"
        >
          <button
            onClick={() => {
              setShowPaymentFlow(false);
              setShowQRCode(false);
            }}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <h2 className="text-purple-600 text-xl font-medium mb-6">
              Perks of Upgrading to Premium
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-purple-600 font-medium">
                <CheckCircle size={18} className="flex-shrink-0" />
                <p>Upgrade to Premium for ₹ 2000</p>
              </div>
              {perks.map((perk, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{perk}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-6">
              By buying this course, you verify that you are neither who delivered recently or caregivers
              agree to these terms. Refunds are only available in limited circumstances according to our
              refund policy. <span className="text-purple-600 cursor-pointer">Learn more...</span>
            </p>

            <button
              onClick={() => setShowQRCode(true)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              Next <span className="text-lg">→</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen bg-rose-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header 
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex gap-8 max-w-7xl mx-auto">
            <div className="flex-1">
              <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
                <img src="/api/placeholder/800/450" alt="Course Video" className="w-full h-full object-cover" />
                {isPremiumContent ? (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                    <Lock className="w-16 h-16 mb-4 text-[#a32e76]" />
                    <div className="text-lg mb-2">Unlock premium access</div>
                    <div className="text-[#a32e76] font-semibold">₹ {courseData.price}</div>
                    <button 
                      onClick={() => setShowPaymentFlow(true)}
                      className="bg-[#a32e76] text-white px-6 py-2 rounded-lg hover:bg-[#922667]"
                    >
                      Unlock Premium
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white cursor-pointer" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-xl font-medium flex-1">{courseData.title}</h1>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={20} className="text-gray-400" />
                  <Download size={20} className="text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#a32e76]">{courseData.instructor.name}</span>
                {courseData.instructor.verified && <Verified className="w-4 h-4 text-[#a32e76]" />}
                <span className={isPremiumContent ? 'text-[#a32e76]' : 'text-green-500'}>
                  {isPremiumContent ? 'Pay to Watch' : 'Free to watch'}
                </span>
                <span className="text-sm text-gray-600">{courseData.stats.views} Views</span>
                <span className="text-sm text-gray-600">{courseData.stats.lastUpdated}</span>
              </div>

              <div className="bg-white rounded-xl p-4 my-6 shadow-sm">
                <p className="text-gray-700">Want to speak directly to a doctor? Upgrade to Premium for 1:1 messaging & much more benefits.</p>
                <button 
                  onClick={() => setShowPaymentFlow(true)}
                  className="bg-[#a32e76] text-white px-6 py-2 rounded-lg hover:bg-[#922667] mt-4"
                >
                  Unlock Premium
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {courseData.instructors.map((instructor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src="/api/placeholder/32/32" alt={instructor.name} className="w-8 h-8 rounded-full" />
                    <div className="text-sm text-[#a32e76]">{instructor.name}</div>
                    <div className="text-xs text-gray-600">{instructor.title}</div>
                    <span className="text-xs px-2 py-1 bg-[#a32e76] bg-opacity-10 text-[#a32e76] rounded-lg">
                      {instructor.type}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-gray-700 text-sm">
                  Discover actionable advice from doctors to manage postpartum hypertension effectively. 
                  This video covers tips on maintaining a heart-healthy diet...
                  <button className="text-[#a32e76] ml-1">Read more...</button>
                </p>
              </div>
            </div>

            <div className="w-80">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-medium">Course Content</h2>
                  <span className="text-sm text-gray-600">{currentLesson}/{courseData.lessons.length}</span>
                </div>
                <div className="divide-y">
                  {courseData.lessons.map((lesson, index) => (
                    <div key={lesson.id} onClick={() => { setCurrentLesson(lesson.id); setIsPremiumContent(lesson.status === "Pay to watch"); }} className={`flex items-start p-4 cursor-pointer hover:bg-gray-50 ${currentLesson === lesson.id ? 'bg-purple-50' : ''}`}>
                      <span className="text-gray-500 mt-2 mr-3">{index + 1}</span>
                      <img src={lesson.thumbnail} alt={lesson.title} className="w-20 h-12 rounded object-cover" />
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{lesson.title}</p>
                        <span className={`text-xs mt-1 ${lesson.status === 'Free to watch' ? 'text-green-500' : 'text-[#a32e76]'}`}>{lesson.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PremiumUpgradeModal />
    </div>
  );
};
export default CoursesPage;