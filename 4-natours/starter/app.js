const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); // Middleware

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id/:optionalId?', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === Number(id));

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log('=========================================');
  console.log('req.body', req.body);
  console.log('=========================================');

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const tourIndex = tours.findIndex((tour) => tour.id === Number(id));

  if (tourIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

    return;
  }

  const updatedTours = tours.map((tour, index) => {
    if (index === tourIndex) {
      return {
        ...tour,
        ...body,
      };
    }

    return tour;
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      if (err) {
      }

      res.status(200).json({
        status: 'success',
        data: tours,
      });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('=========================================');
  console.log('Listen port: ', PORT);
  console.log('=========================================');
});
