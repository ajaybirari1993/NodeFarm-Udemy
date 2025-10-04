const express = require('express');
const {
  getAllTour,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
  checkValidId,
  checkValidBody,
} = require('../controller/tourController');

const router = express.Router();

// Check for valid id
router.param('id', checkValidId);

// Tour Routes
router.route('/').get(getAllTour).post(checkValidBody, createNewTour);
router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
