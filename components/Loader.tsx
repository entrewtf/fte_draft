
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300">Analisando dados...</p>
    </div>
  );
};
