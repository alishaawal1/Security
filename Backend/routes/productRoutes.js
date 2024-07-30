const router = require('express').Router();
const productController = require("../controllers/productControllers");
const { authGuard, authGuardAdmin, guestGuard } = require('../middleware/authGuard');
const rateLimit = require('express-rate-limit');

// Rate Limiting for creating products
const createProductLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 create product requests per windowMs
    message: "Too many requests, please try again after 15 minutes"
});

// Create product API (protected by admin guard and rate limiter)
router.post('/create_product', authGuardAdmin, createProductLimiter, productController.createProduct);

// Get all products API
router.get("/get_products", productController.getAllProducts);

// Get single product API
router.get("/get_product/:id", productController.getSingleProduct);

// Update product API (protected by admin guard)
router.put("/update_product/:id", authGuardAdmin, productController.updateProduct);

// Delete product API (protected by admin guard)
router.delete("/delete_product/:id", authGuardAdmin, productController.deleteProduct);

// Create order API (protected by general auth guard)
router.post("/create_order", authGuard, productController.createOrder);

// Get orders API (protected by general auth guard)
router.get("/get_orders", authGuard, productController.getOrders);
// Routes accessible only to guests (non-authenticated users)
router.get('/login', guestGuard, productController.showLoginPage);
router.get('/register', guestGuard, productController.showRegisterPage);

// Routes accessible to all authenticated users
router.get('/dashboard', authGuard, productController.getDashboard);
router.get('/cakes', authGuard, productController.getCakes);

module.exports = router;
