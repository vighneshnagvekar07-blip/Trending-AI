import React from 'react';
import { OutfitResult, OccasionTheme } from '../types';
import { Search } from 'lucide-react';

interface ResultDisplayProps {
  result: OutfitResult;
  theme: OccasionTheme;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, theme, onReset }) => {
  const imageUrl = `data:image/png;base64,${result.imageBase64}`;

  const getSearchQuery = () => {
    return encodeURIComponent(result.description);
  };

  const searchUrl = `https://www.google.com/search?tbm=shop&q=${getSearchQuery()}`;

  return (
    <div className="animate-fade-in w-full max-w-2xl mx-auto relative z-20">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 ring-1 ring-fashion-100">
        {/* Header */}
        <div className="p-8 text-center border-b border-fashion-100">
          <h2 className="font-serif text-4xl font-bold mb-2 text-fashion-900">Here's Your Vibe</h2>
          <p className="text-fashion-600">AI has generated this look just for you.</p>
        </div>

        {/* Image Display */}
        <div className="p-4 bg-fashion-50">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-inner ring-1 ring-black/5">
            <img 
              src={imageUrl} 
              alt="AI Generated Outfit" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300
            flex items-center justify-center gap-2 font-serif tracking-wide text-center
            bg-fashion-900 text-accent hover:bg-fashion-800 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-fashion-900/20"
          >
            <Search size={20} />
            Shop the Look
          </a>
          <button 
              onClick={onReset}
              className="w-full px-6 py-4 bg-white border-2 border-fashion-200 text-fashion-900 font-bold rounded-xl hover:bg-fashion-900 hover:text-accent hover:border-fashion-900 transition-all duration-300 shadow-sm hover:shadow-xl transform hover:-translate-y-0.5 font-serif flex items-center justify-center gap-2"
          >
            Create Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
