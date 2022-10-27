export interface MetaType {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface ImageType {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
}
