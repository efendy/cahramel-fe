import {ImageType} from './common';
import {IndustryType} from './industry-type';

export interface CompanyProfileAttributes {
  uen: string;
  is_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string;
  contact_address: string;
  contact_postal_code: string;
  unique_id: string;
  image_profile: {
    data: ImageType | null;
  };
  industry_type: {
    data: IndustryType | null;
  };
}

export interface CompanyProfileType {
  id: number;
  attributes: CompanyProfileAttributes;
}
