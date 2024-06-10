const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/api', require('./router'));

const port = 3005;

mongoose.connect('mongodb+srv://sandeepsana2003:ElxZkj0QW4krddu7@cluster0.0rmkkeh.mongodb.net/scourse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running at http://127.0.0.1:${port}/`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
