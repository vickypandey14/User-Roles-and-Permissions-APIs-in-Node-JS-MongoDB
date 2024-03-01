const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const { addCategoryValidator, categoryDeleteValidator, updateCategoryValidator, createPostValidator } = require('../helpers/adminValidator');

const categoryController = require('../controllers/categoryController');

const postController = require('../controllers/postController');


// Authenticated Routes Starts Here (Authorization token needed) -----------


// Category Routes

router.post('/add-category', auth, addCategoryValidator, categoryController.addCategory);
router.get('/get-categories', auth, categoryController.getCategories);
router.post('/delete-category', auth, categoryDeleteValidator, categoryController.deleteCategory);
router.post('/update-category', auth, updateCategoryValidator, categoryController.updateCategory);


//  Post Routes

router.post('/create-post', auth, createPostValidator, postController.createPost);


module.exports = router;