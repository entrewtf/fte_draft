
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
        Estimador de Equipe
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Calcule a equipe ideal para sua próxima conta.
      </p>
    </header>
  );
};
