import { CompanyProfileType } from "./company-profile";

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
    company_profile: {
        data: CompanyProfileType | null
    };
}

export interface UserContractType {
    id: number;
    attributes: Attributes;
}

