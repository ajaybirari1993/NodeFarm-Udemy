const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controller/userController');

const router = express.Router();

// User Routes
router.route('/').get(getAllUsers).post(createNewUser);
router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
