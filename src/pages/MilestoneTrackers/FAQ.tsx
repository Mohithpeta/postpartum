import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FAQ = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqQuestions = [
    {
      question: "How often should my baby feed?",
      answer: "Newborns typically need to feed every 2-3 hours, which means 8-12 times in 24 hours. Breastfed babies may feed more frequently than formula-fed babies. Follow your baby's hunger cues rather than a strict schedule. Signs include rooting, putting hands to mouth, and making sucking noises. Crying is a late sign of hunger."
    },
    {
      question: "How can I improve my milk supply while breastfeeding?",
      answer: "To improve milk supply, ensure frequent nursing (8-12 times daily), proper latch, stay hydrated, eat nutritious foods, pump after feedings, get adequate rest, and consider galactagogues like fenugreek or oatmeal. Contact a lactation consultant if supply concerns persist."
    },
    {
      question: "How do I know if my baby is getting enough milk?",
      answer: "Your baby is likely getting enough milk if they have 6-8 wet diapers daily, 2-5 bowel movements daily in the first few weeks, seem satisfied after feedings, and are gaining weight appropriately (should regain birth weight by 10-14 days)."
    },
    {
      question: "Is it normal for my baby to lose weight after birth?",
      answer: "Yes, it's normal for babies to lose 5-10% of their birth weight in the first few days. They should regain this weight by 10-14 days after birth. If your baby loses more than 10% or doesn't start regaining weight, consult your healthcare provider."
    },
    {
      question: "Why does my baby startle suddenly?",
      answer: "The startle reflex (Moro reflex) is normal in newborns and typically appears when your baby feels like they're falling or hears a loud noise. This reflex usually disappears by 3-6 months. Swaddling can help reduce startling and improve sleep."
    },
    {
      question: "How can I help my baby sleep better?",
      answer: "Establish a bedtime routine, ensure your baby is fed and has a clean diaper before sleep, create a calm environment, swaddle your baby (until they can roll over), use white noise, put your baby down drowsy but awake, and follow safe sleep guidelines."
    },
    {
      question: "When should I be concerned about my baby's poop?",
      answer: "Consult your doctor if your baby's stool is white, red, or black; contains mucus or blood; is very watery (diarrhea); if your baby seems constipated (hard, dry stools); or if there's a sudden change in stool pattern. Breastfed babies may have loose, yellowish stools while formula-fed babies typically have firmer, tan-colored stools."
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header onTopicChange={(topic) => console.log(topic)} />
        <div className="p-4"></div>
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>

          {/* FAQ Banner */}
          <div className="bg-yellow-100 text-center py-8 rounded-lg">
            <h1 className="text-xl font-semibold text-yellow-700">Frequently asked questions</h1>
          </div>

          {/* Week Navigation */}
          <div className="flex space-x-4 mt-6 overflow-x-auto">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg min-w-[100px]">Week 1</button>
            <button className="border px-4 py-2 rounded-lg min-w-[100px]">Week 2</button>
            <button className="border px-4 py-2 rounded-lg min-w-[100px]">Week 3</button>
            <button className="border px-4 py-2 rounded-lg min-w-[100px]">Week 4</button>
            <button className="border px-4 py-2 rounded-lg min-w-[100px]">Week 5</button>
            <button className="border px-4 py-2 rounded-lg min-w-[100px]">Week 6</button>
          </div>

          {/* Content Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">FAQ's related to week 1</h2>
            <p className="mt-2 text-gray-700">
              Explore common Week 1 baby FAQs covering feeding, sleep, and newborn care.
            </p>

            {/* Question Input */}
            <div className="mt-4 mb-6">
              <input
                type="text"
                placeholder="Have a question? Add yours to get expert answers!"
                className="w-full border rounded-lg p-3 text-gray-600"
              />
            </div>

            {/* FAQ List */}
            <div className="mt-4">
              {faqQuestions.map((faq, index) => (
                <div key={index} className="border rounded-lg mb-2 overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {activeQuestion === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {activeQuestion === index && (
                    <div className="p-4 pt-0">
                      {index === 0 && (
                        <div className="mb-4">
                          <img 
                            src="/api/placeholder/600/250"
                            alt="Doctor explaining baby feeding"
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;