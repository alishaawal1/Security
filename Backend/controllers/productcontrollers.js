const Products = require('../model/productModel');
const Orders = require('../model/orderModel');
const cloudinary = require('cloudinary').v2;

// Show Login Page
const showLoginPage = (req, res) => {
    res.status(200).json({ success: true, message: "Login page displayed" });
};

// Show Register Page
const showRegisterPage = (req, res) => {
    res.status(200).json({ success: true, message: "Register page displayed" });
};

// Get Dashboard for Authenticated Users
const getDashboard = async (req, res) => {
    try {
        // Fetch data relevant to the dashboard
        res.status(200).json({ success: true, message: "Dashboard data fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get Cakes for Authenticated Users
const getCakes = async (req, res) => {
    try {
        const cakes = await Products.find({ productCategory: 'Cakes' });
        res.status(200).json({ success: true, message: "Cakes fetched successfully", cakes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create Product (Admin Only)
const createProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const { productName, productPrice, productDescription, productCategory } = req.body;
    const { productImage } = req.files;

    if (!productName || !productPrice || !productDescription || !productCategory || !productImage) {
        return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }

    try {
        const uploadedImage = await cloudinary.uploader.upload(productImage.path, {
            folder: "products",
            crop: "scale"
        });

        const newProduct = new Products({
            productName,
            productPrice,
            productDescription,
            productCategory,
            productImageUrl: uploadedImage.secure_url
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get All Products (Admin Only or Public Depending on Use Case)
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ success: true, message: "Products fetched successfully", products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get Single Product (Admin Only or Public Depending on Use Case)
const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required!" });
    }

    try {
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product fetched successfully", product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update Product (Admin Only)
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, productPrice, productDescription, productCategory } = req.body;
    const { productImage } = req.files;

    if (!productName || !productPrice || !productDescription || !productCategory) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        let updatedProduct = {
            productName,
            productPrice,
            productDescription,
            productCategory
        };

        if (productImage) {
            const uploadedImage = await cloudinary.uploader.upload(productImage.path, {
                folder: "products",
                crop: "scale"
            });
            updatedProduct.productImageUrl = uploadedImage.secure_url;
        }

        const product = await Products.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete Product (Admin Only)
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create Order (Authenticated Users Only)
const createOrder = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        const newOrder = new Orders({
            userId,
            productId,
            quantity
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get Orders (Authenticated Users Only)
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find().populate('userId');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    showLoginPage,
    showRegisterPage,
    getDashboard,
    getCakes,
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    getOrders
};
