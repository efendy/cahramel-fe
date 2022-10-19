

export interface ContractType {
    date_start: string;
    date_end: string;
    createdAt: Date;
    updatedAt: Date;
    email_address: string;
    access_role: 'owner' | 'admin' | 'user';
    employee_id: string;
    is_draft: boolean;
    onboarding_status: string;
    offboarding_status: string;
    complete_onboarding_by: string;
    complete_offboarding_by?: string;
    id: number;
}

export interface UserProfileType {
    first_name: string;
    createdAt: Date;
    updatedAt: Date;
    last_name: string;
    email_address: string;
    phone_number?: string;
    birthday?: string;
    gender: string;
    marital_status: string;
    nationality?: string;
    race: string;
    religion: string;
    id: number;
    contract: ContractType;
}




interface Email {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    external_data?: any;
    createdAt: Date;
    updatedAt: Date;
    first_name: string;
    last_name: string;
    jwt: string;
}

export interface UserCookieType {
    email: Email;
    jwt: string;
    iat: number;
    exp: number;
    jti: string;
}



