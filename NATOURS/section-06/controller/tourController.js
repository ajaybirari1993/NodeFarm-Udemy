const fs = require('fs');

const filePath = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = fs.readFileSync(filePath);
const toursData = JSON.parse(tours);

const checkValidId = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  const id = parseInt(req.params.id, 10);
  const tour = toursData.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

const checkValidBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration || !req.body.difficulty) {
    return res.status(400).json({
      status: 'fail',
      message: 'Required fields are missing',
    });
  }
  next();
};

const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  toursData.push(newTour);

  fs.writeFileSync(filePath, JSON.stringify(toursData));
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

const getTourById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = toursData.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTourById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = toursData.find((el) => el.id === id);

  const updatedTour = { ...tour, ...req.body };
  const index = toursData.findIndex((el) => el.id === id);
  toursData[index] = updatedTour;

  fs.writeFileSync(filePath, JSON.stringify(toursData));

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
};

const deleteTourById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = toursData.findIndex((el) => el.id === id);

  toursData.splice(index, 1);

  fs.writeFileSync(filePath, JSON.stringify(toursData));

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllTour,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
  checkValidId,
  checkValidBody,
};
