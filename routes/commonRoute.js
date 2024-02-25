const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const { addCategoryValidator } = require('../helpers/adminValidator');

const categoryController = require('../controllers/categoryController');


// Authenticated Routes Starts Here (Authorization token needed) -----------


// Category Routes

router.post('/add-category', auth, addCategoryValidator, categoryController.addCategory);


module.exports = router;