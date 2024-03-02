import { CircularProgress, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  selectCategories,
  selectCategoriesFetching,
} from './categoriesSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchCategories } from './categoriesThunks.ts';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <List>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography variant="h5" color="primary" component="div">
          All items
        </Typography>
      </Link>
      {categoriesFetching ? (
        <CircularProgress />
      ) : (
        categories.map((category) => (
          <Link
            to={`/products?category=${category._id}`}
            key={category._id}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="h5" color="primary" component="div">
              {category.title}
            </Typography>
          </Link>
        ))
      )}
    </List>
  );
};

export default CategoryList;
