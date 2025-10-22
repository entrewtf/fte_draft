import React from 'react';
import type { TeamStructureResponse } from '../types';

export const ResultsDisplay: React.FC<{ results: TeamStructureResponse }> = ({ results }) => {
  const totalTeamMembers = results.departments.reduce(
    (total, dept) => total + dept.team.reduce((deptTotal, member) => deptTotal + member.count, 0),
    0
  );

  return (
    <div className="h-full">
       <h2 className="text-2xl font-semibold text-gray-200 tracking-tight mb-6">
          Equipe sugerida, {totalTeamMembers} profissionais
       </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.departments.map((deptResult) => {
          const departmentTotal = deptResult.team.reduce((acc, member) => acc + member.count, 0);
          return (
            <div key={deptResult.department} className="border border-gray-800 rounded-lg p-5 flex flex-col h-full bg-black">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-yellow-500 tracking-wider uppercase">
                  {deptResult.department}
                </h3>
                <span className="text-lg font-bold text-white">
                  {departmentTotal}
                </span>
              </div>
              
              <div className="flex-grow space-y-2 mb-4">
                {deptResult.team.map((member) => (
                  <div key={member.role} className="flex items-baseline justify-between">
                    <span className="text-gray-400">{member.role}</span>
                    <span className="font-medium text-gray-300">{member.count}</span>
                  </div>
                ))}
              </div>
              
              {deptResult.justification && (
                <>
                  <hr className="border-gray-800 w-full my-3" />
                  <p className="text-sm text-gray-500 flex-shrink-0">
                    {deptResult.justification}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};