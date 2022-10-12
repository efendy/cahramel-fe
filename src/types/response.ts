export interface ErrorResponse {
  status: number;
  name: string; //"ValidationError",
  message: string; // "Invalid identifier or password",
  details: any; // {}
}

export interface Response {
  data: any;
  meta?: any;
  error?: ErrorResponse;
}
