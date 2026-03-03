export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pages: number;
  total: number;
  limit: number;
}
