// src/services/userService.js
import { axios } from '../../boot/axios'
class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  // Lấy danh sách sản phẩm
  async login(data) {
    try {
      const response = await this.api.post('/login', data);

      return response;
    } catch (error) {
      if (error.response) {
        return error.response
      }
      throw error;
    }
  }
}

export default new AuthService();
