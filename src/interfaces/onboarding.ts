import {ImageType} from './common';
import {CompanyProfileType} from './company-profile';
import {DepartmentType} from './department';
import {JobTitleType} from './job-title';

export interface OnBoardingAttributes {
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

export interface OnBoardingType {
  id: number;
  attributes: OnBoardingAttributes;
}

// export enum OnBoardStepEnum {
//   Content = 'content',
//   Image = 'image',
//   Video = 'video_url',
//   Document = 'document',
//   ProfileUploadImage = 'user_profile_upload_image',
//   ProfileUpdateData = 'user_profile_update_data',
//   UserDocument = 'user_document',
// }

export type OnBoardStepTypes =
  | 'content'
  | 'image'
  | 'video_url'
  | 'document'
  | 'user_profile_upload_image'
  | 'user_profile_update_data'
  | 'user_document';

export interface OnBoardingStepAttributes {
  order: number;
  content: string;
  type: OnBoardStepTypes;
  image?: {
    data?: ImageType;
  };
  video_url?: {
    data?: ImageType;
  };
  document?: {
    data?: ImageType;
  };
  onboarding?: {
    data?: OnBoardingType;
  };
}

export interface OnBoardingStepType {
  id: number;
  attributes: OnBoardingStepAttributes;
}
