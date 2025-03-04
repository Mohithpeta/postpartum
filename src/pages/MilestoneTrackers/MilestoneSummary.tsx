import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Edit, Trash2, ChevronLeft } from "lucide-react"; // Import icons

export function MilestoneSummary() {
  const location = useLocation();
  const isOverviewPage = location.pathname === "/trackers/milestone-summary";
  const navigate = useNavigate(); // For back navigation

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header onTopicChange={(topic) => console.log(`Topic changed to: ${topic}`)} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {isOverviewPage ? (
              <>
                {/* Back Navigation Button */}
                <button
                  onClick={() => navigate(-1)} // Go back to the previous page
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  <span>Back</span>
                </button>

                {/* Main Heading */}
                <div className="mb-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h1 className="text-2xl font-semibold text-gray-800" style={{textAlign:"center"}}>Milestone Summary</h1>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Here's your baby's Week 1 milestone summary! Track their growth, key developments, and important reflexes. You can download this summary to keep a record of your little one's progress.
                  </p>
                </div>

                {/* Week Navigation Scroll Bar */}
                <div className="flex space-x-4 mb-8 overflow-x-auto scrollbar-hide">
                  <button className="text-purple-600 font-medium whitespace-nowrap border border-purple-600 rounded-lg px-4 py-2 text-lg">Week 1</button>
                  <button className="text-gray-600 hover:text-gray-800 whitespace-nowrap border border-gray-300 rounded-lg px-4 py-2 text-lg">Week 2</button>
                  <button className="text-gray-600 hover:text-gray-800 whitespace-nowrap border border-gray-300 rounded-lg px-4 py-2 text-lg">Week 3</button>
                  <button className="text-gray-600 hover:text-gray-800 whitespace-nowrap border border-gray-300 rounded-lg px-4 py-2 text-lg">Week 4</button>
                  <button className="text-gray-600 hover:text-gray-800 whitespace-nowrap border border-gray-300 rounded-lg px-4 py-2 text-lg">Week 5</button>
                </div>

                {/* Physical Development Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-purple-600 text-sm">🏃</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Physical Development</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">Answered Questions</div>
                  </div>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Startles with Moro reflex</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Shows palmar reflex (opens mouth when palms are pressed)</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Rooting and swallowing reflexes</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Blinks at bright lights</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Focuses on objects 8-12 inches away</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Sensitive to sound direction</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Social Development Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-orange-600 text-sm">👋</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Social Development</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">Answered Questions</div>
                  </div>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Responds to sudden changes with entire body</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Can lift head</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Moves head side to side</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Unanswered Questions</td>
                        <td className="py-3 text-right"></td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Does your baby sleep 17-20 hrs/day?</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Does your baby feed 7-8+ times/day?</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Senses & Reflexes Development Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 text-sm">👂</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Senses & Reflexes Development</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">Answered Questions</div>
                  </div>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Quiets down when picked up</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Stops sucking to look at something</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Shuts out stimuli by sleeping</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Makes animal-like sounds</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cognitive Development Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-green-600 text-sm">🧠</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Cognitive Development</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">Answered Questions</div>
                  </div>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Shows excitement or distress in response to surroundings</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Responds positively to a soft human voice</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Tries to focus on a human face or voice</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Warning Sign Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-red-600 text-sm">⚠️</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Warning Sign</h2>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">Noted Warnings</div>
                  </div>
                  
                  <table className="w-full">
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-700">Struggles to latch properly during feedings</td>
                        <td className="py-3 text-right">
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 ml-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MilestoneSummary;