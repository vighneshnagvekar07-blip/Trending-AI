import React from 'react';
import { Check } from 'lucide-react';
import { OccasionTheme } from '../types';

interface ThemeCardProps {
  theme: OccasionTheme;
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isSelected, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200
        ${isSelected 
          ? 'bg-fashion-600 border-fashion-600 text-white shadow-lg scale-105' 
          : 'bg-white border-transparent hover:border-fashion-300 hover:bg-white shadow-sm text-gray-500 hover:text-fashion-600'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-accent text-fashion-900 rounded-full p-0.5 shadow-sm">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
      <div className={`mb-3 ${isSelected ? 'text-accent' : 'text-fashion-400'}`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-center font-serif leading-tight">{theme}</span>
    </button>
  );
};

export default ThemeCard;