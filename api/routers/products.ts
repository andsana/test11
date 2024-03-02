import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import { ProductMutation } from '../types';
import { imagesUpload } from '../multer';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';

const productsRouter = Router();

productsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const product = await Product.findById(_id)
      .populate('category', 'title')
      .populate('user', 'displayName phoneNumber');

    if (!product) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

productsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      const productData: ProductMutation = {
        category: req.body.category,
        user: req.user._id.toString(),
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image: req.file ? req.file.filename : null,
      };

      const product = new Product(productData);
      await product.save();

      res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found!' });
    }

    if (product.user !== req.user?._id) {
      return res
        .status(403)
        .send({ error: 'Not authorized to delete this product!' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted successfully!' });
  } catch (e) {
    next(e);
  }
});

productsRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const categoryId = req.query.category;

    if (categoryId) {
      query = { category: categoryId };
    }

    const results = await Product.find(query);

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

export default productsRouter;
