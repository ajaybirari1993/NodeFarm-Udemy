const express = require('express');
const {
  getAllTour,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
  aliasTopTours,
} = require('../controller/tourController');

const router = express.Router();

// Check for valid id
// router.param('id', checkValidId);

// Tour Routes
router.get('/top-5-cheap', aliasTopTours, getAllTour);
router.route('/').get(getAllTour).post(createNewTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
