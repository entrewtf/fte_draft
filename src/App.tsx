import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { estimateTeam } from './services/geminiService';
import type { AgencyInputData, TeamStructureResponse, DepartmentData } from './types';
import { DEPARTMENTS } from './constants';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<AgencyInputData>({
    totalJobs: 150,
    departments: DEPARTMENTS.map(name => ({
      name,
      jobsPercentage: 50,
      complexityPercentage: 20,
    })),
    considerations: '',
  });
  const [results, setResults] = useState<TeamStructureResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDataChange = useCallback((newData: Partial<AgencyInputData>) => {
    setInputData(prevData => ({ ...prevData, ...newData }));
  }, []);
  
  const handleDepartmentChange = useCallback((index: number, newDepartmentData: Partial<DepartmentData>) => {
    setInputData(prevData => {
        const newDepartments = [...prevData.departments];
        newDepartments[index] = { ...newDepartments[index], ...newDepartmentData };
        return { ...prevData, departments: newDepartments };
    });
  }, []);


  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await estimateTeam(inputData);
      setResults(response);
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao estimar a equipe. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-light selection:bg-yellow-500 selection:text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Header />
        <main className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <InputForm
                data={inputData}
                onDataChange={handleDataChange}
                onDepartmentChange={handleDepartmentChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
            <div className="relative lg:col-span-2">
              {isLoading && <Loader />}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {results && <ResultsDisplay results={results} />}
              {!isLoading && !results && !error && (
                 <div className="flex items-center justify-center h-full text-gray-600">
                    <p>Os resultados da sua equipe ideal aparecerão aqui.</p>
                 </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;