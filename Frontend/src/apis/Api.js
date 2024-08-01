import axios from "axios";

const Api = axios.create({
    baseURL: "https://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

// Create a separate header configuration for authorization
const token = localStorage.getItem('token');
const config = {
    headers: {
        'authorization': `Bearer ${token}`
    }
};

// Public routes
export const testApi = () => Api.get("/test");
export const createUserApi = (data) => Api.post('/api/user/create', data);
export const loginUserApi = (data) => Api.post('/api/user/login', data);

// Authenticated routes
export const updateUserApi = (data) => Api.put('/api/user/update', data, config);
export const createProductApi = (data) => Api.post('/api/product/create_product', data, config);
export const getAllProductsApi = () => Api.get('/api/product/get_products');
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);
export const updateProductApi = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config);
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config);
export const requestPasswordResetApi = (data) => Api.post('/api/user/forgot', data);
export const resetPasswordApi = (token, data) => Api.put(`/api/user/password/reset/${token}`, data);

// Guest routes
export const showLoginPageApi = () => Api.get('/login');
export const showRegisterPageApi = () => Api.get('/register');
