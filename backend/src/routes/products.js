const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', authMiddleware, getProductById);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
