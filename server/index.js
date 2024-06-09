const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3005;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
