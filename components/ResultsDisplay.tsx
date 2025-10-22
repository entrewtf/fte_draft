import React from 'react';
import type { TeamStructureResponse } from '../types';

interface ResultsDisplayProps {
  results: TeamStructureResponse;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6 tracking-tight">Equipe Recomendada</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.departments.map((deptResult) => (
          <div key={deptResult.department} className="border border-gray-700 rounded-lg p-5 flex flex-col h-full">
            <h3 className="text-yellow-500 font-bold tracking-wider uppercase text-sm">
              {deptResult.department}
            </h3>
            
            <div className="flex-grow my-6 space-y-4">
              {deptResult.team.map((member) => (
                <div key={member.role} className="flex items-baseline justify-between">
                  <span className="text-gray-300">{member.role}</span>
                  <span className="text-3xl font-bold text-white">{member.count}</span>
                </div>
              ))}
            </div>
            
            {deptResult.justification && (
              <>
                <hr className="border-gray-700 w-full mb-4" />
                <p className="text-sm text-gray-500 flex-shrink-0">
                  {deptResult.justification}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};