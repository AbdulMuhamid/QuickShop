import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to request headers if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data)
};

export const productAPI = {
  getAll: (params) => apiClient.get('/products', { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.patch(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`)
};

export const recommendationAPI = {
  getPersonalized: () => apiClient.get('/recommendations/personalized'),
  getTrending: (limit = 10) => apiClient.get('/recommendations/trending', { params: { limit } })
};

export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.patch('/users/profile', data),
  addToWishlist: (productId) => apiClient.post('/users/wishlist', { productId }),
  removeFromWishlist: (productId) => apiClient.delete('/users/wishlist', { data: { productId } }),
  getOrders: () => apiClient.get('/users/orders')
};

export const behaviorAPI = {
  track: (data) => apiClient.post('/behavior', data),
  getHistory: (params) => apiClient.get('/behavior', { params })
};

export const notificationAPI = {
  getAll: (unreadOnly = false) => apiClient.get('/notifications', { params: { unreadOnly } }),
  sendOffer: (data) => apiClient.post('/notifications/offer', data),
  markAsRead: (notificationId) => apiClient.patch(`/notifications/${notificationId}`),
  delete: (notificationId) => apiClient.delete(`/notifications/${notificationId}`)
};

export default apiClient;
