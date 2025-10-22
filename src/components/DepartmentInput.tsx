import React from 'react';

interface DepartmentInputProps {
  departmentName: string;
  jobsPercentage: number;
  complexityPercentage: number;
  onJobsChange: (value: number) => void;
  onComplexityChange: (value: number) => void;
}

export const DepartmentInput: React.FC<DepartmentInputProps> = ({
  departmentName,
  jobsPercentage,
  complexityPercentage,
  onJobsChange,
  onComplexityChange,
}) => {
  return (
    <div className="border border-gray-600 p-4 rounded-lg h-full">
      <h3 className="font-semibold text-gray-200">{departmentName}</h3>
      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-500">Envolvimento nos Jobs</label>
            <span className="text-sm font-medium text-yellow-500">{jobsPercentage}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={jobsPercentage}
            onChange={(e) => onJobsChange(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-500">Complexidade</label>
            <span className="text-sm font-medium text-yellow-500">{complexityPercentage}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={complexityPercentage}
            onChange={(e) => onComplexityChange(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
