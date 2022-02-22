const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

let removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

let dropAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (err) {
      if (err.message === 'ns not found') {
        return;
      }

      if (err.message.includes('a background operation is currently running')) {
        return;
      }

      console.log(err.message);
    }
  }
}

let setupDB = databaseName => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/SDCTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  });

  afterEach(async () => {
    await removeAllCollections();
  })

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  })
}

module.exports = setupDB;
