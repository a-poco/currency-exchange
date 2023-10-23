import { useMutation, useQuery } from 'react-query';
import * as api from '../api';

export const useCountry = (countryName: string) => {
  return useQuery(['country', countryName], () => api.getCountry(countryName), {
    enabled: !!countryName,
    retry: 0,
  });
};

export const useConverToSek = () => {
  return useMutation((params: { amount: number; targetCurrencies: string[] }) =>
    api.converToSek(params.amount, params.targetCurrencies),
  );
};
