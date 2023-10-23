import { ConversionRates, Country } from './types';

export const loginUser = async (username: string, password: string) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error(data.message || 'Login failed');
  }
};

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCountry = async (countryName: string): Promise<Country[]> => {
  const headers = getHeaders();
  const response = await fetch(`/api/country/${countryName}`, { headers });
  if (response.status === 401) {
    throw new Error('Sorry, you need to login again');
  } else if (!response.ok) {
    throw new Error('Country not found, please try again');
  }

  return response.json();
};

export const converToSek = async (
  amount: number,
  targetCurrencies: string[],
): Promise<ConversionRates> => {
  const headers = getHeaders();

  const response = await fetch(
    `/api/convert/SEK/${amount}?targetCurrencies=${targetCurrencies}`,
    {
      headers,
    },
  );
  if (response.status === 401) {
    throw new Error('Sorry, you need to login again');
  } else if (!response.ok) {
    throw new Error('Please enter a correct value');
  }
  return response.json();
};

export const logoutUser = async () => {
  localStorage.removeItem('token');

  return JSON.stringify({ message: 'Logged out successfully' });
};
