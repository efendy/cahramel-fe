interface Attributes {
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndustryType {
  id: number;
  attributes: Attributes;
}
