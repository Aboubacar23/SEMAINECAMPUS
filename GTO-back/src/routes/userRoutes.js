const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//create routes
router.post('/create', userController.createUser);

//login
router.post('/login', userController.login);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserID);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.editUser);


module.exports = router;
