const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const { addCategoryValidator, categoryDeleteValidator, updateCategoryValidator } = require('../helpers/adminValidator');

const categoryController = require('../controllers/categoryController');


// Authenticated Routes Starts Here (Authorization token needed) -----------


// Category Routes

router.post('/add-category', auth, addCategoryValidator, categoryController.addCategory);
router.get('/get-categories', auth, categoryController.getCategories);
router.post('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory);
router.post('/update-category', auth, updateCategoryValidator, categoryController.updateCategory);


module.exports = router;