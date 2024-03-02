import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProducts } from './productsSlice';
import { useEffect } from 'react';
import { fetchProducts } from './productsThunks';
import ProductItem from './components/ProductItem';
import { selectUser } from '../users/usersSlice.ts';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Cars</Typography>
        </Grid>
        <Grid item>
          {user && (
            <Button color="primary" component={Link} to="/products/new">
              Add product
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;