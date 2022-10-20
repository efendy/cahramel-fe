import { ImageType } from "./common";
import { UserContractType } from "./user-contract";

export interface UserProfileAttributes {
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
    user_contracts: {
        data: UserContractType[] | null
    };
    image_profile: {
        data: ImageType | null
    };
}

export interface UserProfileType {
    id: number;
    attributes: UserProfileAttributes;
}


