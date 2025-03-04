import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Nutrition = () => {
    const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header onTopicChange={(topic) => console.log(topic)} />
            <div className="p-4"></div>
        <div className="p-6">
        <button
                  onClick={() => navigate(-1)} // Go back to the previous page
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  <span>Back</span>
                </button>
          {/* Nutrition Banner */}
          <div className="bg-purple-200 text-center py-8 rounded-lg">
            <h1 className="text-xl font-semibold text-purple-700">Nutrition</h1>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Month 1 - 6</button>
            <button className="border px-4 py-2 rounded-lg">Month 6 - 12</button>
            <button className="border px-4 py-2 rounded-lg">Year 1 - 2</button>
          </div>

          {/* Content Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">1st week Nutrition tips</h2>
            <p className="mt-2 text-gray-700">
              Here’s your baby’s Week 1 nutrition tips! Ensure your little one gets enough nourishment with frequent feedings, proper latching, and digestion monitoring. You can download these tips to support your baby’s healthy growth.
            </p>
            <p className="mt-4 text-gray-700">
              During the first week after birth, infants should be exclusively breastfed. Breast milk, especially colostrum, provides essential nutrients and antibodies necessary for growth and immunity. Exclusive breastfeeding should continue for the first six months without any additional food or liquid, including water.
            </p>
            <p className="mt-4 text-gray-700">
              For infants who are not breastfed, formula feeding is the recommended alternative. Infant formula, derived from cow’s milk with added vitamins, minerals, and vegetable oils, is designed to meet a baby’s nutritional needs. However, cow’s milk must not be given until six months of age, and water should not be introduced before six months.
            </p>
          </div>
          
          {/* Download Button */}
          <div className="mt-6 flex justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center">
              Download Nutrition ↩
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
