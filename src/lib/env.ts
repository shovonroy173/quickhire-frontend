const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const env = {
  apiUrl: apiUrl?.trim() ? apiUrl : 'https://quickhire-backend-1mc0.onrender.com/api',
} as const;
