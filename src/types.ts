export interface DepartmentData {
  name: string;
  jobsPercentage: number;
  complexityPercentage:number;
}

export interface AgencyInputData {
  totalJobs: number;
  departments: DepartmentData[];
  considerations?: string;
}

export interface TeamMember {
  role: string;
  count: number;
}

export interface DepartmentResult {
  department: string;
  team: TeamMember[];
  justification: string;
}

export interface TeamStructureResponse {
  departments: DepartmentResult[];
}
