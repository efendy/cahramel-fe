import {CompanyProfileType} from './company-profile';
import {DepartmentType} from './department';
import {JobTitleType} from './job-title';
import {UserProfileType} from './user-profile';

interface Attributes {
  date_start: string;
  date_end: string;
  createdAt: Date;
  updatedAt: Date;
  email_address: string;
  access_role: 'user' | 'admin' | 'owner';
  employee_id: string;
  is_draft: boolean;
  onboarding_status: string;
  offboarding_status: string;
  complete_onboarding_by: string;
  complete_offboarding_by?: string;
  current_onboard_order: number;
  current_offboard_order: number;
  company_profile?: {
    data?: CompanyProfileType;
  };
  job_title?: {
    data?: JobTitleType;
  };
  reporting_to_main?: {
    data?: UserContractType;
  };
  reporting_to_secondary?: {
    data?: UserContractType;
  };
  department?: {
    data: DepartmentType;
  };
  user_profile?: {
    data?: UserProfileType;
  };
}

export interface UserContractType {
  id: number;
  attributes: Attributes;
}
