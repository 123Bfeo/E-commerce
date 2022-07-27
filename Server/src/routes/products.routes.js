const multer = require('multer');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

const validateCreateProductFormMiddleware = require('../middlewares/validateCreateProductForm.middleware');
const productImageMiddleware = require('../middlewares/productImage.middleware');
const userController = require('../controllers/user.controller');
const fileProductMiddleware = require('../middlewares/fileProduct.middleware');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');
const validateCreateProduct = validateCreateProductFormMiddleware.createProduct();
const fileUpload = multer({
	storage: fileProductMiddleware,
})
//Todos los productos
// router.get('/product', productController.allProducts);
//Crear un producto
router.get('/create', authenticateMiddleware, productController.createProduct);
router.post('/create', fileUpload.single('image'), productController.saveProduct);

//router.get('/cart', productController.cartProduct);

// Editar y actualizar un producto
router.get('/edit/:id', authenticateMiddleware, validateCreateProduct, productController.editProduct);
router.put('/edit/:id', fileUpload.single('image'), validateCreateProduct, productController.updateProduct);
// eliminar un producto
router.delete('/delete/:id', productController.deleteProduct);

// Buscar un producto por ID
// router.get('/search/:id', productController.searchProduct);

router.get('/products', productController.products);

module.exports = router;


