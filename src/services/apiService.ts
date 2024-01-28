import axios from 'axios'
const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

export class ApiService {
  static async signIn({ email, password }: { email: String; password: String }) {
    return axios.request({
      method: 'get',
      baseURL,
      url: '/users/validate',
      params: { email, password },
    })
  }
}
