import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  title: string;
  price: number;
  id: string;
  image: string;
}

const ProductItem: React.FC<Props> = ({ title, price, id, image }) => {
  const cardImage = apiURL + '/' + image;
  return (
    <Grid item sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%' }}>
        <CardActionArea component={Link} to={'/products/' + id}>
          <CardHeader title={title} />
          <ImageCardMedia image={cardImage} title={title} />
          <CardContent>
            <strong>{price} $</strong>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductItem;
