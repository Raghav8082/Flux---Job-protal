const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000')
  : (import.meta.env.VITE_API_BASE_URL || '');

export { API_BASE_URL };
export const USER_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const Job_API_ENDPOINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_ENDPOINT = `${API_BASE_URL}/api/v1/company`;
