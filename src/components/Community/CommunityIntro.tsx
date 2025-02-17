import { useNavigate } from 'react-router-dom';

export function CommunityIntro() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-start">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-8 text-[#a32e76]">Lifecourse Hypertension Care</h2>
                <p className="text-gray-600 mb-6">
                    Join our community dedicated to supporting individuals managing hypertension 
                    throughout different life stages. Connect with experts, share experiences, 
                    and access valuable resources.
                </p>
                <button
                    onClick={() => navigate('/groups')}
                    className="px-6 py-3 bg-[#a32e76] text-white font-medium rounded-full 
                                     hover:bg-[#8e2968] transition-colors"
                >
                    Join Community
                </button>
            </div>
        </div>
    );
}