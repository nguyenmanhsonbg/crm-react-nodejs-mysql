// routes/usersRoutes.js

const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserRoleSupport,
  loginUser, 
} = require('../controllers/userController');

const { checkAuthAndRole } = require("../middleware/auth");

const router = express.Router();


router.post('/login', loginUser);

router.get('/getAllUsers', getAllUsers);
router.get('/getUserRoleSupport', getUserRoleSupport);
router.get('/getUserById/:id', getUserById);
router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);


// router.get('/users', checkAuthAndRole(['admin', 'support']), getAllUsers);  // Only 'admin' and 'support' can access this
// router.get('/users/:id', checkAuthAndRole(['admin', 'support']), getUserById);

module.exports = router;
