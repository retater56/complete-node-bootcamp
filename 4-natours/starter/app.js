const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// ====================================== Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  // console.log('=========================================');
  // console.log('Hello from Middleware');
  // console.log('=========================================');

  next();
}); // Middleware, should be defined before app.route to be called by route middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// ====================================== Tours Routes

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  // console.log('=========================================');
  // console.log('req time', req.requestTime);
  // console.log('=========================================');

  res.status(200).json({
    status: 'success',
    // requestTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  const { id } = req.params;

  const tourIndex = tours.findIndex((tour) => tour.id === Number(id));

  if (tourIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
      }

      res.status(200).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// ====================================== Tours Routes

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined',
  });
};

// ====================================== Route handlers

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('=========================================');
  console.log('Listen port: ', PORT);
  console.log('=========================================');
});
