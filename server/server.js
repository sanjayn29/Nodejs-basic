import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

