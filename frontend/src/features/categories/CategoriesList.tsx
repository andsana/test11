import { CircularProgress, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectCategories, selectCategoriesFetching } from './categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
      {categoriesFetching ? (
        <CircularProgress />
      ) : (
        categories.map((category) => (
          <Link
            to={`/categories/${category._id}`}
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
