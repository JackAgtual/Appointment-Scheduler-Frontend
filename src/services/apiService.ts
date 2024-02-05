import axios from 'axios'
import { Credentials } from '../types/userTypes'

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

export class ApiService {
  static async signIn({ email, password }: Credentials) {
    return axios.request({
      method: 'get',
      baseURL,
      url: '/users/validate',
      params: { email, password },
    })
  }

  static async createAccount({
    orderNumber,
    email,
    password,
  }: {
    orderNumber: string
    email: string
    password: string
  }) {
    return axios.request({
      method: 'post',
      baseURL,
      url: '/users/create',
      data: {
        orderNumber,
        email,
        password,
      },
    })
  }

  static async getLogs({ email, password }: Credentials) {
    return axios.request({
      method: 'get',
      baseURL,
      url: '/logs',
      params: {
        email,
        password,
      },
    })
  }

  static async getLastQueryTime({ email, password }: Credentials) {
    return axios.request({
      method: 'get',
      baseURL,
      url: '/users/last-query-time',
      params: {
        email,
        password,
      },
    })
  }
}
