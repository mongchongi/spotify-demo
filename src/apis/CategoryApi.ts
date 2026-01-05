import axios from 'axios';
import type { CategoryRequest, CategoryResponse } from '../models/category';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

export const getCategories = async (token: string, params: CategoryRequest): Promise<CategoryResponse> => {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
