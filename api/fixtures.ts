import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'products', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [toyotaCategory, hyundaiCategory, fordCategory] = await Category.create(
    {
      title: 'toyota',
    },
    {
      title: 'hyundai',
    },
    {
      title: 'ford',
    },
  );

  const [user1, user2, user3] = await User.create(
    {
      username: 'user1',
      password: '123',
      token: crypto.randomUUID(),
      displayName: 'John Snow',
      phone: 89990600747,
    },
    {
      username: 'user2',
      password: '123',
      token: crypto.randomUUID(),
      displayName: 'Sheldon Kuper',
      phone: 89990600666,
    },
    {
      username: 'user3',
      password: '123',
      token: crypto.randomUUID(),
      displayName: 'Nick Adam',
      phone: 89990600777,
    },
  );

  await Product.create(
    {
      title: 'camry',
      description: 'sport',
      price: 41361,
      category: toyotaCategory,
      image: 'fixtures/camry.png',
      user: user1,
    },
    {
      title: 'corolla cross',
      description: 'premium',
      price: 33762,
      category: toyotaCategory,
      image: 'fixtures/corolla.png',
      user: user2,
    },
    {
      title: 'yaris cross',
      description: 'premium',
      price: 33762,
      category: toyotaCategory,
      image: 'fixtures/yaris.jpg',
      user: user3,
    },
    {
      title: 'creta',
      description: 'premium',
      price: 33762,
      category: hyundaiCategory,
      image: 'fixtures/creta.png',
      user: user1,
    },
    {
      title: 'elantra',
      description: 'premium',
      price: 33762,
      category: hyundaiCategory,
      image: 'fixtures/elantra.png',
      user: user2,
    },
    {
      title: 'santa fe',
      description: 'hybrid',
      price: 33762,
      category: hyundaiCategory,
      image: 'fixtures/santafe.png',
      user: user3,
    },
    {
      title: 'wildtrack',
      description: 'premium',
      price: 33762,
      category: fordCategory,
      image: 'fixtures/wildtrack.png',
      user: user1,
    },
    {
      title: 'titanium+',
      description: 'premium',
      price: 33762,
      category: fordCategory,
      image: 'fixtures/titanium.png',
      user: user2,
    },
    {
      title: 'trend',
      description: 'premium',
      price: 33762,
      category: fordCategory,
      image: 'fixtures/trend.png',
      user: user3,
    },
  );

  await db.close();
};

void run();
