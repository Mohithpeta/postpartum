import { useState, useMemo } from 'react';
import { ChevronLeft, Check} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

interface Question {
    id: number;
    text: string;
    options: string[];
    category: string;
}

interface WarningInput {
    id: number;
    text: string;
    category: string;
    checked: boolean;
    notes: string;
}

interface Category {
    id: string;
    name: string;
    color: string;
    optional?: boolean;
}

// Regular milestone questions
const questions: Question[] = [
    // Social Development
    {id: 1, text: "Does your baby respond to sudden changes with their entire body?", options: ["Yes", "No", "Not Yet", "Not Sure"], category: 'social'},
    {id: 2, text: "Can your baby lift their head ?", options: ["Yes, easily", "Yes, but with some effort", "Not Yet", "Not Sure"], category: 'social'},
    {id: 3, text: "Does your baby move their head from side to side?", options: ["Frequently", "Occasionally", "Rarely", "Not at all"], category: 'social'},
    {id: 4, text: "Does your baby sleeps 17-20 hrs/day?", options: ["Yes", "No", "Not sure"], category: 'social'},
    {id: 5, text: "Does your baby feeds 7-8+ times/day", options: ["Yes", "No", "Not sure"], category: 'social'},
    // Physical Development
    {id: 6, text: "Does your baby startle with Moro reflex?", options: ["Yes", "Sometimes", "No", "Not sure"], category: 'physical'},
    {id: 7, text: "Does your baby show the palmar reflex?", options: ["Yes", "Occasionally", "No", "Not sure"], category: 'physical'},
    {id: 8, text: "Does your baby have rooting and swallowing reflexes?", options: ["Yes,consistently", "Occasionally", "Rarely", "Not at all"], category: 'physical'},
    {id: 9, text: "Does you baby blink at bright lights?", options: ["Yes", "Occasionally", "No", "Not sure"], category: 'physical'},
    {id: 10, text: "Can your baby focus on objects 8-12 inches away?", options: ["Yes, clearly", "sometimes", "Not yet", "Not sure"], category: 'physical'},
    {id: 11, text: "Is your baby sensitive to the direction of sounds?", options: ["Yes", "Occasionally turns towards sounds", "No response to sounds", "Not sure"], category: 'physical'},
    // Senses & Reflexes
    {id: 12, text: "Does your baby quiet down when picked up?", options: ["Yes", "Sometimes", "No", "Not sure"], category: 'senses'},
    {id: 13, text: "Does your baby stop sucking to look at something?", options: ["Yes,Often", "Occasionally", "Rarely", "Not sure"], category: 'senses'},
    {id: 14, text: "Does your baby shut out stimuli by sleeping?", options: ["Yes, frequently", "Sometimes", "No", "Not sure"], category: 'senses'},
    {id: 15, text: "Does your baby make animal-like sounds?", options: ["Yes, regularly", "Sometimes", "Not yet", "Not sure"], category: 'senses'},
    // Cognitive Development
    {id: 16, text: "Does your baby show excitement or distress in response to their surroundings?", options: ["Yes, frequently", "Occasionally", "Rarely", "Not sure"], category: 'cognitive'},
    {id: 17, text: "Does your baby respond positively to a soft human voice?", options: ["Yes, frequently", "Occasionally", "Rarely", "Not sure"], category: 'cognitive'},
    {id: 18, text: "Does your baby try to focus on a human face or voice?", options: ["Yes, frequently", "Sometimes", "No", "Not sure"], category: 'cognitive'}
];

// Warning signs inputs
const warningInputs: WarningInput[] = [
    {id: 101, text: "Difficulty feeding, struggles to latch, or seems unusually fussy during feedings", category: 'warning', checked: false, notes: ""},
    {id: 102, text: "A bruise or bump on their head that doesn't improve", category: 'warning', checked: false, notes: ""},
    {id: 103, text: "Difficulty breathing, such as sucking their ribs in while breathing or if their lips appear blue", category: 'warning', checked: false, notes: ""},
    {id: 104, text: "Vomits after most feedings, especially if the vomit is brown, green, or forcefully ejected", category: 'warning', checked: false, notes: ""},
    {id: 105, text: "Mucus or blood in their stools or diarrhea after each feeding", category: 'warning', checked: false, notes: ""},
    {id: 106, text: "No bowel movement during the first week", category: 'warning', checked: false, notes: ""},
    {id: 107, text: "Fever of 100.6°F or higher, measured rectally", category: 'warning', checked: false, notes: ""},
    {id: 108, text: "Skin or eyes appear yellow, which could indicate jaundice", category: 'warning', checked: false, notes: ""},
    {id: 109, text: "Looks or acts differently, such as showing extreme lethargy or being highly irritable", category: 'warning', checked: false, notes: ""}
];

const categories: Category[] = [
    { id: 'social', name: 'Social Development', color: 'bg-purple-600 text-white' },
    { id: 'physical', name: 'Physical Development', color: 'bg-purple-600 text-white' },
    { id: 'senses', name: 'Senses & Reflexes Development', color: 'bg-purple-600 text-white' },
    { id: 'cognitive', name: 'Cognitive Development', color: 'bg-purple-600 text-white' },
    { id: 'warning', name: 'Warning Signs', color: 'bg-purple-600 text-white', optional: true }
];

export const MilestoneChecklist = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('social');
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [includeWarnings] = useState(true);
    const [warningResponses, setWarningResponses] = useState<WarningInput[]>(warningInputs);

    // Get category index to determine if we're on the last category
    const currentCategoryIndex = useMemo(() => {
        return categories.findIndex(c => c.id === activeCategory);
    }, [activeCategory]);

    const isLastCategory = useMemo(() => {
        return currentCategoryIndex === categories.length - 1 || 
               (currentCategoryIndex === categories.length - 2 && !includeWarnings);
    }, [currentCategoryIndex, includeWarnings]);

    // Filter questions by category and page
    const questionsPerPage = 5;
    const filteredQuestions = useMemo(() => {
        if (activeCategory === 'warning') {
            return [];
        }
        return questions.filter(q => q.category === activeCategory);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const currentQuestions = useMemo(() => {
        const startIndex = (currentPage - 1) * questionsPerPage;
        return filteredQuestions.slice(startIndex, startIndex + questionsPerPage);
    }, [filteredQuestions, currentPage]);

    const isLastPage = useMemo(() => {
        return currentPage === totalPages;
    }, [currentPage, totalPages]);

    const showSubmitButton = useMemo(() => {
        return isLastCategory && (activeCategory === 'warning' || isLastPage);
    }, [isLastCategory, activeCategory, isLastPage]);

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleWarningToggle = (id: number) => {
        setWarningResponses(prev => 
            prev.map(item => 
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleWarningNote = (id: number, note: string) => {
        setWarningResponses(prev => 
            prev.map(item => 
                item.id === id ? { ...item, notes: note } : item
            )
        );
    };

    const handleNext = () => {
        // If we're not on warning signs, check if all questions on current page are answered
        if (activeCategory !== 'warning') {
            const currentQuestionIds = currentQuestions.map(q => q.id);
            const allAnswered = currentQuestionIds.every(id => answers[id]);

            if (!allAnswered) {
                alert('Please answer all questions before proceeding.');
                return;
            }
        }

        // If not last page of current category, go to next page
        if (currentPage < totalPages && activeCategory !== 'warning') {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
            return;
        }

        // If last page of current category
        if (isLastCategory) {
            // Submit if we're on the warning category or the last regular category (if warnings skipped)
            handleSubmit();
        } else {
            // Move to next category
            const nextCategory = categories[currentCategoryIndex + 1];
            setActiveCategory(nextCategory.id);
            setCurrentPage(1);
            window.scrollTo(0, 0);
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setCurrentPage(1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = () => {
        // Calculate required questions (excluding warning signs)
        const requiredQuestionIds = questions.map(q => q.id);
        const allRequiredAnswered = requiredQuestionIds.every(id => answers[id]);

        if (!allRequiredAnswered) {
            alert('Please complete all required sections before submitting.');
            // Find first unanswered category
            for (const category of categories.filter(c => c.id !== 'warning')) {
                const categoryQuestions = questions.filter(q => q.category === category.id);
                const allCategoryAnswered = categoryQuestions.every(q => answers[q.id]);
                if (!allCategoryAnswered) {
                    setActiveCategory(category.id);
                    setCurrentPage(1);
                    window.scrollTo(0, 0);
                    return;
                }
            }
            return;
        }

        // Process warning responses
        const activeWarnings = warningResponses.filter(item => item.checked);

        const result = {
            answers,
            timestamp: new Date().toISOString(),
            warningSignsPresent: activeWarnings.length > 0,
            warningSignsCount: activeWarnings.length,
            warningDetails: activeWarnings
        };

        // Save to localStorage
        localStorage.setItem('milestoneResults', JSON.stringify(result));
        
        // Navigate to results page
        navigate('/milestone-results', { state: { results: result } });
    };

    const progressPercentage = useMemo(() => {
        const answeredCount = Object.keys(answers).length;
        const totalQuestionCount = questions.length;
        return (answeredCount / totalQuestionCount) * 100;
    }, [answers]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full">
                <Header onTopicChange={() => {}} />
                <div className="flex-1 overflow-y-auto pb-8">
                    <div className="max-w-3xl mx-auto p-4 md:p-6">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <Link to="/trackers" className="p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                            <h1 className="text-xl font-semibold">Milestone Checklist: 1st week</h1>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                            <div 
                                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
                            />
                        </div>

                        {/* Category Toggle */}
                        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-lg whitespace-nowrap transition-colors ${
                                        category.id === activeCategory 
                                            ? category.id === 'warning'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-purple-600 text-white' 
                                            : 'bg-white text-gray-800 hover:bg-purple-50'
                                    } ${category.optional ? 'border border-red-600' : ''}`}
                                >
                                    {category.name}
                                    {category.optional && ' (Optional)'}
                                </button>
                            ))}
                        </div>

                        {/* Warning Signs Info */}
                        {activeCategory === 'warning' && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <h2 className="text-red-800 font-medium mb-2">Warning Signs to Watch For</h2>
                                <p className="text-red-700 text-sm">
                                    Check any warning signs you've noticed and add notes if needed. This section is optional.
                                    If you notice any of these signs, please contact your healthcare provider immediately.
                                </p>
                            </div>
                        )}

                        {/* Questions or Warning Inputs */}
                        <div className="space-y-6">
                            {activeCategory === 'warning' ? (
                                // Warning Signs Inputs
                                warningResponses.map(item => (
                                    <div 
                                        key={item.id} 
                                        className="bg-white p-4 md:p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border-l-4 border-red-400"
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <button
                                                onClick={() => handleWarningToggle(item.id)}
                                                className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                                                    item.checked ? 'bg-red-500' : 'border border-gray-300'
                                                }`}
                                            >
                                                {item.checked && <Check className="w-3 h-3 text-white" />}
                                            </button>
                                            <p className="text-gray-800 font-medium">{item.text}</p>
                                        </div>
                                        
                                        {item.checked && (
                                            <div className="pl-8">
                                                <textarea
                                                    value={item.notes}
                                                    onChange={(e) => handleWarningNote(item.id, e.target.value)}
                                                    placeholder="Add any details or notes here..."
                                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-red-400 focus:border-red-400"
                                                    rows={3}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                // Regular Questions
                                currentQuestions.map(question => (
                                    <div 
                                        key={question.id} 
                                        className="bg-white p-4 md:p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        <p className="text-gray-800 mb-4 font-medium">{question.text}</p>
                                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                                            {question.options.map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleAnswer(question.id, option)}
                                                    className={`p-2 md:p-3 rounded-lg border transition-all duration-200 ${
                                                        answers[question.id] === option
                                                            ? 'border-purple-600 bg-purple-50 text-purple-600 font-medium'
                                                            : 'border-gray-200 hover:border-purple-600 hover:bg-purple-50'
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex justify-between items-center">
                            <button 
                                onClick={handleNext}
                                className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
                                style={{
                                    backgroundColor: showSubmitButton ? '#10b981' : '#9333ea',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    
                                }}
                            >
                                {showSubmitButton ? 'Submit' : 'Next'}
                            </button>
                            
                            {activeCategory !== 'warning' && (
                                <p className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};