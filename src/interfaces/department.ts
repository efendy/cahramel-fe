import { CompanyProfileType } from "./company-profile";

export interface DepartmentAttributes {
    title: string;
    description: string;
    company_profile?: {
        data?: CompanyProfileType
    };
    parents?: {
        data?: DepartmentType
    }
}


export interface DepartmentType {
    id: number;
    attributes: DepartmentAttributes
}