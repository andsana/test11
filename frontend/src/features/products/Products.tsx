import { CircularProgress, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProducts, selectProductsLoading } from './productsSlice';
import { useEffect } from 'react';
import { fetchProducts } from './productsThunks';
import ProductItem from './components/ProductItem';
import CategoriesList from '../categories/CategoriesList.tsx';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <CategoriesList />
      </Grid>
      <Grid item xs={10} container spacing={2}>
        {productsLoading ? (
          <CircularProgress />
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Products;
