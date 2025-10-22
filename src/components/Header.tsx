import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-left">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
        &gt;_FTE, draft
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Ferramenta de Teste de Estimativa
      </p>
    </header>
  );
};