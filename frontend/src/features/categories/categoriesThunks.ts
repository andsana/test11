import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Category } from '../../types';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (categoryId?: string) => {
    let url = '/categories';

    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    const response = await axiosApi.get<Category[]>(url);
    return response.data;
  },
);
