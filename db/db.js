const mongoose = require('mongoose');

const db_url = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'TaskManager',
  })
  .then(() => {
    console.log('Connected to the Database.');
  })
  .catch(err => console.error(err));
