const express = require('express');
const {
  getAllTour,
  createNewTour,
  getTourById,
  updateTourById,
  deleteTourById,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controller/tourController');

const router = express.Router();

// Check for valid id
// router.param('id', checkValidId);

// Tour Routes
router.get('/top-5-cheap', aliasTopTours, getAllTour);

router.get('/tour-stats', getTourStats);
router.get('/monthly-plan/:year', getMonthlyPlan);

router.route('/').get(getAllTour).post(createNewTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTourById)
  .delete(deleteTourById);

module.exports = router;
