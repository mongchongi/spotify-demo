import type { ApiResponse } from './apiResponse';

export interface CategoryRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface Category {
  href: string;
  icons: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  id: string;
  name: string;
}

export interface CategoryResponse {
  categories: ApiResponse<Category>;
}
