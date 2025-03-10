const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //   res.status(200).send('Hello from server');
  res.status(200).json({
    message: 'Hello from server',
  });
});

app.post('/', (req, res) => {
  res.send('POST available');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('=========================================');
  console.log('Listen port: ', PORT);
  console.log('=========================================');
});
