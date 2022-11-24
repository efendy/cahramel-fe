import {ImageType} from './common';
import {CompanyProfileType} from './company-profile';
import {DepartmentType} from './department';
import {JobTitleType} from './job-title';

export interface OffFBoardingAttributes {
  title: string;
  description: string;
  job_titles?: {
    data?: JobTitleType[];
  };
  departments?: {
    data?: DepartmentType[];
  };
  company_profile?: {
    data?: CompanyProfileType;
  };
  is_activated: boolean;
}

export interface OffBoardingType {
  id: number;
  attributes: OffFBoardingAttributes;
}

export type OffBoardStepTypes = 'content' | 'image' | 'document';

export interface OffBoardingStepAttributes {
  order: number;
  content: string;
  type: OffBoardStepTypes;
  image?: {
    data?: ImageType;
  };
  video_url?: string;
  document?: {
    data?: ImageType;
  };
  offboarding?: {
    data?: OffBoardingType;
  };
}

export interface OffBoardingStepType {
  id: number;
  attributes: OffBoardingStepAttributes;
}
