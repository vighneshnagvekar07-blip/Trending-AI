import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  subLabel?: string;
  onImageSelected: (file: File) => void;
  onClear: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, subLabel, onImageSelected, onClear }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onClear();
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      onClick={triggerUpload}
      className={`
        group relative flex flex-col items-center justify-center w-full h-64 
        rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
        ${preview 
          ? 'border-fashion-500 bg-fashion-50' 
          : 'border-fashion-300 bg-white hover:border-fashion-500 hover:bg-fashion-50 hover:shadow-lg'
        }
      `}
    >
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {preview ? (
        <>
          <img 
            src={preview} 
            alt="Preview" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-fashion-900/20 group-hover:bg-fashion-900/10 transition-colors" />
          <button 
            onClick={handleClear}
            className="absolute top-3 right-3 p-2 bg-white rounded-full text-fashion-900 hover:bg-accent hover:text-fashion-900 transition-all shadow-lg z-10"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-fashion-900/80 to-transparent text-white font-medium text-sm text-center font-serif tracking-wide">
            Tap to change
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center text-center p-6 space-y-3 transition-transform duration-300 group-hover:-translate-y-1">
          <div className="w-14 h-14 rounded-full bg-fashion-100 flex items-center justify-center text-fashion-600 group-hover:bg-fashion-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <Upload size={24} />
          </div>
          <div>
            <p className="font-bold text-fashion-900 font-serif text-lg">{label}</p>
            {subLabel && <p className="text-xs text-fashion-500 mt-1 font-medium uppercase tracking-wider">{subLabel}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;