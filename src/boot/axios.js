// src/boot/axios.js
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { Cookies, Notify } from 'quasar';
import router from 'src/router';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_NAME}/${import.meta.env.VITE_API_VERSION}`,
  withCredentials: true, // Gửi cookies nếu bạn sử dụng HttpOnly cookies
});

export default boot(({ app }) => {

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Nếu lỗi là do Access Token hết hạn và chưa thử làm mới
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {

          await api.post('/refresh');
          return api(originalRequest);
        } catch (refreshError) {
          try {
            // await api.post('/auth/logout'); // Đảm bảo backend xóa refresh_token cookie
          } catch (logoutError) {
            console.error('Logout failed:', logoutError);
          }

          Notify.create({
            type: 'negative',
            message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          });
          router.push('/auth/login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Thêm Axios instance vào Vue như một plugin
  app.config.globalProperties.$axios = api;
});

// Export Axios instance như một named export
export { api as axios };
