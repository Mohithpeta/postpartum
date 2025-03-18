import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    label: string;
  }[];
  allowMultiple?: boolean;
}

export function HomeOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  const navigate = useNavigate();

  const questions: Question[] = [
    {
      id: 1,
      text: 'Were you diagnosed with hypertension during pregnancy?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
        { id: 'not-sure', label: 'Not Sure' }
      ]
    },
    {
      id: 2,
      text: 'Are you currently taking medication for hypertension?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
        { id: 'planning', label: 'Planning to consult a doctor' }
      ]
    },
    {
      id: 3,
      text: 'Have you experienced high blood pressure after delivery?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
        { id: 'occasionally', label: 'Occasionally' },
        { id: 'dont-know', label: 'Don\'t Know' }
      ]
    },
    {
      id: 4,
      text: 'How often do you check your blood pressure at home?',
      options: [
        { id: 'daily', label: 'Daily' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' },
        { id: 'never', label: 'Never' }
      ]
    },
    {
      id: 5,
      text: 'Do you have any of the following conditions?',
      options: [
        { id: 'diabetes', label: 'Diabetes' },
        { id: 'obesity', label: 'Obesity' },
        { id: 'thyroid', label: 'Thyroid Issues' },
        { id: 'heart', label: 'Heart Disease' },
        { id: 'none', label: 'None of the above' }
      ],
      allowMultiple: true
    },
    {
      id: 6,
      text: 'Are you facing any of these common symptoms?',
      options: [
        { id: 'headaches', label: 'Frequent headaches' },
        { id: 'dizziness', label: 'Dizziness' },
        { id: 'swelling', label: 'Swelling in hands/feet' },
        { id: 'heartbeat', label: 'Rapid heartbeat' },
        { id: 'vision', label: 'Blurry vision' },
        { id: 'none', label: 'None' }
      ],
      allowMultiple: true
    },
    {
      id: 7,
      text: 'What areas of postpartum hypertension management are you most interested in?',
      options: [
        { id: 'diet', label: 'Diet & Nutrition' },
        { id: 'medication', label: 'Medication Guidance' },
        { id: 'lifestyle', label: 'Lifestyle Changes to manage hypertension' },
        { id: 'monitoring', label: 'Preventing Long-Term Health Risks' },
        { id: 'exercise', label: 'Exercise & Fitness' },
        { id: 'mental', label: 'Managing Stress & Mental Health' }
      ],
      allowMultiple: true
    },
    {
      id: 8,
      text: 'Would you like expert guidance on managing postpartum hypertension through personalized courses?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' }
      ]
    }
  ];

  const handleOptionSelect = (questionId: number, optionId: string) => {
    setSelectedOptions(prev => {
      const currentSelections = prev[questionId] || [];
      const question = questions.find(q => q.id === questionId);
      
      if (question?.allowMultiple) {
        // For multiple selection questions
        if (currentSelections.includes(optionId)) {
          // If already selected, remove it
          return {
            ...prev,
            [questionId]: currentSelections.filter(id => id !== optionId)
          };
        } else {
          // If selecting "None of the above", deselect all others
          if (optionId === 'none') {
            return {
              ...prev,
              [questionId]: ['none']
            };
          }
          
          // If selecting another option while "None" is selected, remove "None"
          const newSelections = [...currentSelections];
          if (newSelections.includes('none')) {
            newSelections.splice(newSelections.indexOf('none'), 1);
          }
          
          return {
            ...prev,
            [questionId]: [...newSelections, optionId]
          };
        }
      } else {
        // For single selection questions
        return {
          ...prev,
          [questionId]: [optionId]
        };
      }
    });
  };

  const isOptionSelected = (questionId: number, optionId: string) => {
    return selectedOptions[questionId]?.includes(optionId) || false;
  };

  const isCurrentQuestionAnswered = () => {
    if (currentStep === 0) return true;
    const currentQuestion = questions[currentStep - 1];
    return selectedOptions[currentQuestion.id] && selectedOptions[currentQuestion.id].length > 0;
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form and navigate to home page
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the collected data to your backend
    console.log('Form submitted with data:', selectedOptions);
    
    // Navigate to home page
    navigate('/home');
  };

  const handleSkip = () => {
    // Navigate to home page without saving preferences
    navigate('/home');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header onTopicChange={(topic) => console.log(`Topic changed to: ${topic}`)} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Close button */}
              <button 
                onClick={handleSkip} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Get Personalized Guidance for a Healthier Recovery!</h2>
                {currentStep === 0 && (
                  <p className="text-gray-600 mt-2">
                    Your postpartum journey is unique, and managing hypertension requires care tailored to you. Answer a few quick questions about your experience and health needs, and LifeCourse will fine-tune your content based on your well-being.
                  </p>
                )}
              </div>

              {currentStep === 0 ? (
                <>
                  {/* Introduction with images */}
                  <div className="flex justify-center space-x-6 mb-8">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <img src="/api/placeholder/64/64" alt="Woman" className="w-16 h-16" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <img src="/api/placeholder/64/64" alt="LifeCourse" className="w-16 h-16" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <img src="/api/placeholder/64/64" alt="Doctor" className="w-16 h-16" />
                      </div>
                    </div>
                  </div>

                  {/* Get Started button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleNext}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-8 py-3 transition-colors"
                    >
                      Get Started →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Question content */}
                  <div className="mb-8">
                    {/* Progress indicator */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(currentStep / (questions.length + 1)) * 100}%` }}
                      ></div>
                    </div>

                    {/* Current question */}
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      {questions[currentStep - 1].text}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {questions[currentStep - 1].options.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type={questions[currentStep - 1].allowMultiple ? "checkbox" : "radio"}
                            id={`option-${option.id}`}
                            name={`question-${questions[currentStep - 1].id}`}
                            checked={isOptionSelected(questions[currentStep - 1].id, option.id)}
                            onChange={() => handleOptionSelect(questions[currentStep - 1].id, option.id)}
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          />
                          <label 
                            htmlFor={`option-${option.id}`} 
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={handleBack}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Back
                    </button>
                    
                    {currentStep < questions.length ? (
                      <button
                        onClick={handleNext}
                        disabled={!isCurrentQuestionAnswered()}
                        className={`${
                          isCurrentQuestionAnswered() 
                            ? "bg-purple-600 hover:bg-purple-700" 
                            : "bg-gray-300 cursor-not-allowed"
                        } text-white font-medium rounded-lg px-6 py-2 transition-colors`}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!isCurrentQuestionAnswered()}
                        className={`${
                          isCurrentQuestionAnswered() 
                            ? "bg-purple-600 hover:bg-purple-700" 
                            : "bg-gray-300 cursor-not-allowed"
                        } text-white font-medium rounded-lg px-6 py-2 transition-colors`}
                      >
                        Submit →
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}