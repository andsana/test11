import express from 'express';
import Category from '../models/Category';
import mongoose, { mongo, Types } from 'mongoose';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
    };

    const category = new Category(categoryData);

    await category.save();
    return res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if (e instanceof mongo.MongoServerError && e.code === 11000) {
      return res.status(422).send({ message: 'Title should be unique' });
    }

    next(e);
  }
});

categoriesRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const artistId = req.query.artist;

    if (artistId) {
      query = { artist: artistId };
    }

    const results = await Category.find(query).sort({ releaseYear: -1 });

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const category = await Category.findById(_id).populate(
      'artist',
      'title information',
    );

    if (!category) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(category);
  } catch (e) {
    next(e);
  }
});

export default categoriesRouter;
