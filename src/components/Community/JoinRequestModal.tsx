import { useState } from 'react';
import { X} from 'lucide-react';
import { Group } from './types';

interface JoinRequestModalProps {
  group: Group | null;
  onClose: () => void;
  onSubmit: (note: string) => void;
}

export function JoinRequestModal({ group, onClose, onSubmit }: JoinRequestModalProps) {
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSubmit(note);
      setIsLoading(false);
    }, 1000);
  };

  if (!group) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 
                    bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Join {group.name}</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">Add a note (optional):</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-2 w-full h-20 border rounded-md p-2 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-[#a32e76]"
          placeholder="Write your note here..."
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 w-full py-2 bg-[#a32e76] text-white text-sm font-medium 
                   rounded-md hover:bg-[#8e2968] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send Now'}
        </button>
      </div>
    </div>
  );
}