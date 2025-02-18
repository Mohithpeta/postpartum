import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar' ;// Adjust the import path as necessary
import { Header } from '../../components/Header'; // Adjust the import path as necessary

interface Question {
    id: number;
    text: string;
    options: string[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "Does your baby respond to sudden changes with their entire body?",
        options: ["Yes", "No", "Not Yet", "Not Sure"]
    },
    {
        id: 2,
        text: "Can your baby lift their head ?",
        options: ["Yes, easily", "Yes, but with some effort", "Not Yet", "Not Sure"]
    },
    {
        id: 3,
        text: "Does your baby move their head from side to side?",
        options: ["Frequently", "Occasionally", "Rarely", "Not at all"]
    },
    {
        id: 4,
        text: "Does your baby sleeps 17-20 hrs/day?",
        options: ["Yes", "No", "Not sure"]
    },
    {
        id: 5,
        text: "Does your baby feeds 7-8+ times/day",
        options: ["Yes", "No", "Not sure"]
    }
];

const categories = [
    { id: 'social', name: 'Social Development', color: 'bg-purple-600 text-white' },
    { id: 'physical', name: 'Physical Development', color: 'bg-white text-gray-800' },
    { id: 'senses', name: 'Senses & Reflexes Development', color: 'bg-white text-gray-800' },
    { id: 'cognitive', name: 'Cognitive Development', color: 'bg-white text-gray-800' },
    { id: 'warning', name: 'Warning Signs', color: 'bg-white text-gray-800' }
];

export const MilestoneChecklist = () => {
    const [activeCategory, setActiveCategory] = useState('social');
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    return (
        <div className="flex">
            <Sidebar /> {/* Render the sidebar */}
            <div className="flex-1">
                <Header onTopicChange={(topic: string) => console.log(topic)} /> {/* Render the header */}
                <div className="max-w-3xl mx-auto p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/trackers" className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-xl font-semibold">Milestone Checklist 1st week</h1>
                    </div>

                    {/* Category Toggle */}
                    <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                    category.id === activeCategory ? category.color : 'bg-white text-gray-800'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Questions */}
                    <div className="space-y-8">
                        {questions.map(question => (
                            <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-gray-800 mb-4">{question.text}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {question.options.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(question.id, option)}
                                            className={`p-3 rounded-lg border ${
                                                answers[question.id] === option
                                                    ? 'border-purple-600 bg-purple-50 text-purple-600'
                                                    : 'border-gray-200 hover:border-purple-600'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <div className="mt-8">
                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilestoneChecklist;