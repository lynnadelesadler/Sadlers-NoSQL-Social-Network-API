const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');


// /api/users
// Get all users & Create new user
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
// Get user by ID & Update user by ID & Delete user by ID
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);


// /api/users/:userId/friends/:friendId
// Create new Friend by ID & Delete new Friend by ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);



module.exports = router;