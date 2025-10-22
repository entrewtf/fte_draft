import React from 'react';
import type { AgencyInputData, DepartmentData } from '../types';
import { DepartmentInput } from './DepartmentInput';

interface InputFormProps {
  data: AgencyInputData;
  onDataChange: (newData: Partial<AgencyInputData>) => void;
  onDepartmentChange: (index: number, newDepartmentData: Partial<DepartmentData>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ data, onDataChange, onDepartmentChange, onSubmit, isLoading }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-1">
          <label htmlFor="totalJobs" className="block text-sm font-medium text-gray-400 mb-2">
            Jobs/Mês
          </label>
          <input
            type="number"
            id="totalJobs"
            value={data.totalJobs}
            onChange={(e) => onDataChange({ totalJobs: parseInt(e.target.value, 10) || 0 })}
            className="w-full bg-black border border-gray-600 text-gray-200 rounded-md p-3 focus:ring-yellow-500 focus:border-yellow-500 transition"
            placeholder="Ex: 150"
          />
        </div>
        <div className="col-span-6 sm:col-span-5">
          <label htmlFor="considerations" className="block text-sm font-medium text-gray-400 mb-2">
            Considerações
          </label>
          <textarea
            id="considerations"
            value={data.considerations || ''}
            onChange={(e) => onDataChange({ considerations: e.target.value })}
            className="w-full bg-black border border-gray-600 text-gray-200 rounded-md p-3 focus:ring-yellow-500 focus:border-yellow-500 transition h-[46px] resize-none"
            placeholder="Ex: cliente com reuniões semanais, alta exigência criativa, etc."
            rows={1}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.departments.map((dept, index) => (
          <DepartmentInput
            key={dept.name}
            departmentName={dept.name}
            jobsPercentage={dept.jobsPercentage}
            complexityPercentage={dept.complexityPercentage}
            onJobsChange={(value) => onDepartmentChange(index, { jobsPercentage: value })}
            onComplexityChange={(value) => onDepartmentChange(index, { complexityPercentage: value })}
          />
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculando...
          </>
        ) : (
          'Estimar Equipe'
        )}
      </button>
    </div>
  );
};
