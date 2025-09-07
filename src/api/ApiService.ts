import axios from 'axios';

export enum ResponseType {
  success = 'success',
  error = 'error',
}

export const ApiService = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
