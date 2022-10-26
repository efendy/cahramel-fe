import { IndustryType } from "./industry-type";

export interface JobTitleAttributes {
    title: string;
    description: string;
    industry_type?: {
        data?: IndustryType
    };
    parents?: {
        data?: JobTitleType
    }
}


export interface JobTitleType {
    id: number;
    attributes: JobTitleAttributes
}