const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const tour = tours.find((tour) => tour.id === Number(val));

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

    return;
  }

  next();
};

exports.checkTourBody = (req, res, next) => {
  if (!req.body?.name || !req.body?.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Incorrect body',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const tourIndex = tours.findIndex((tour) => tour.id === Number(id));

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

exports.deleteTour = (req, res) => {
  const { id } = req.params;

  const tourIndex = tours.findIndex((tour) => tour.id === Number(id));

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
