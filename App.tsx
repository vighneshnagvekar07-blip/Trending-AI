import React, { useState, useCallback } from 'react';
import { 
  Shirt, 
  Briefcase, 
  Coffee, 
  Heart, 
  Music, 
  Trophy, 
  Loader2,
  Sparkles,
  Zap
} from 'lucide-react';

import { OccasionTheme, OutfitResult } from './types';
import { fileToBase64, getMimeType } from './utils';
import { generateAndDescribeOutfit } from './services/geminiService';

import ImageUploader from './components/ImageUploader';
import ThemeCard from './components/ThemeCard';
import ResultDisplay from './components/ResultDisplay';

const THEMES = [
  { id: OccasionTheme.CASUAL, icon: <Coffee size={28} /> },
  { id: OccasionTheme.BUSINESS, icon: <Briefcase size={28} /> },
  { id: OccasionTheme.DATE_NIGHT, icon: <Heart size={28} /> },
  { id: OccasionTheme.PARTY, icon: <Music size={28} /> },
  { id: OccasionTheme.FORMAL, icon: <Sparkles size={28} /> },
  { id: OccasionTheme.GYM, icon: <Trophy size={28} /> },
];

const App: React.FC = () => {
  // State
  const [userFile, setUserFile] = useState<File | null>(null);
  const [clothingFile, setClothingFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<OccasionTheme | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outfitResult, setOutfitResult] = useState<OutfitResult | null>(null);

  const handleStyleMe = useCallback(async () => {
    if (!userFile || !clothingFile || !selectedTheme) {
      setError("Yo! You need to upload both pics and pick a vibe first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userBase64 = await fileToBase64(userFile);
      const clothingBase64 = await fileToBase64(clothingFile);
      
      const userMime = getMimeType(userFile);
      const clothingMime = getMimeType(clothingFile);

      const result = await generateAndDescribeOutfit(
        userBase64,
        clothingBase64,
        selectedTheme,
        userMime,
        clothingMime
      );

      setOutfitResult(result);
    } catch (err) {
      console.error(err);
      setError("Vibe check failed (API Error). The model might be busy, try again!");
    } finally {
      setLoading(false);
    }
  }, [userFile, clothingFile, selectedTheme]);

  const handleReset = () => {
    setUserFile(null);
    setClothingFile(null);
    setSelectedTheme(null);
    setOutfitResult(null);
    setError(null);
  };

  // --- Render ---

  if (outfitResult && selectedTheme) {
    return (
      <div className="min-h-screen bg-fashion-50 py-12 px-4 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fashion-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <ResultDisplay result={outfitResult} theme={selectedTheme} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fashion-50 flex flex-col relative overflow-hidden font-sans">
       {/* Decorative background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-fashion-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-fashion-600 rounded-xl rotate-3 flex items-center justify-center text-white shadow-lg shadow-fashion-500/30">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-serif text-2xl font-bold text-fashion-900 tracking-tight">Trending AI</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-fashion-600 bg-fashion-100 px-4 py-2 rounded-full uppercase tracking-wider">
            <Sparkles size={12} />
            Powered by Gemini
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12 space-y-12 relative z-10">
        
        <div className="text-center space-y-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-fashion-900 tracking-tighter leading-none">
            Fit Check.
          </h1>
          <p className="text-fashion-600 text-lg md:text-xl max-w-lg mx-auto font-medium">
            Upload your pic and that one item you're dying to wear. 
            We'll curate the rest.
          </p>
        </div>

        {/* Step 1: Uploads */}
        <section className="space-y-6 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/50 shadow-sm">
          <div className="flex items-center gap-3 text-fashion-900">
            <div className="w-8 h-8 rounded-full bg-fashion-900 text-white flex items-center justify-center text-sm font-bold font-serif">1</div>
            <h2 className="font-bold text-xl font-serif">Drop the visuals</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader 
              label="Your Photo" 
              subLabel="Show us who you are"
              onImageSelected={setUserFile}
              onClear={() => setUserFile(null)}
            />
            <ImageUploader 
              label="The Piece" 
              subLabel="Top, pants, whatever."
              onImageSelected={setClothingFile}
              onClear={() => setClothingFile(null)}
            />
          </div>
        </section>

        {/* Step 2: Theme */}
        <section className="space-y-6">
           <div className="flex items-center gap-3 text-fashion-900">
            <div className="w-8 h-8 rounded-full bg-fashion-900 text-white flex items-center justify-center text-sm font-bold font-serif">2</div>
            <h2 className="font-bold text-xl font-serif">What's the vibe?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {THEMES.map((theme) => (
              <ThemeCard 
                key={theme.id}
                theme={theme.id}
                icon={theme.icon}
                isSelected={selectedTheme === theme.id}
                onClick={() => setSelectedTheme(theme.id)}
              />
            ))}
          </div>
        </section>

        {/* Action Area */}
        <div className="pt-4 pb-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center font-medium mb-6 border border-red-100 shadow-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={handleStyleMe}
            disabled={!userFile || !clothingFile || !selectedTheme || loading}
            className={`
              w-full py-5 rounded-2xl font-bold text-xl shadow-xl transition-all duration-300
              flex items-center justify-center gap-3 font-serif tracking-wide
              ${(!userFile || !clothingFile || !selectedTheme || loading)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-fashion-900 text-accent hover:bg-fashion-800 hover:scale-[1.02] hover:shadow-2xl hover:shadow-fashion-900/20'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Generating the vibe...
              </>
            ) : (
              <>
                <Shirt size={24} strokeWidth={2.5} />
                GET MY FIT
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
};

export default App;
