import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (categoryId?: string) => {
    let url = '/products';

    if (categoryId) {
      url += `?category=${categoryId}`;
    }

    const response = await axiosApi.get<Product[]>(url);
    return response.data;
  },
);

export const createProduct = createAsyncThunk<null, ProductMutation>(
  'products/create',
  async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach((key) => {
      const value = productMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/products', formData);
  },
);
