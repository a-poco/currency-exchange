import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useConverToSek } from '../hooks/useData';
import { ConversionRates, CountryProps } from '../types';

const CountryList: React.FC<CountryProps> = ({ countries }) => {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmounts, setConvertedAmounts] =
    useState<ConversionRates | null>(null);
  const [targetCurrencies, setTargetCurrencies] = useState<string[]>();

  const convertMutation = useConverToSek();

  useEffect(() => {
    if (
      countries &&
      countries.length > 0 &&
      countries[0].currencies.length > 0
    ) {
      const distinctCurrencies = countries
        .flatMap((country) => country.currencies)
        .reduce<string[]>((acc, currency) => {
          if (!acc.includes(currency)) {
            acc.push(currency);
          }
          return acc;
        }, []);

      setTargetCurrencies(distinctCurrencies);
    }
  }, [countries]);

  const handleOnClick = async () => {
    try {
      const result = await convertMutation.mutateAsync({
        amount: parseFloat(amount),
        targetCurrencies: targetCurrencies!!,
      });

      setConvertedAmounts(result);
    } catch (error) {
      console.error('Failed to convert amount:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div>
          <div className="flex flex-row items-center mt-4 mb-4 space-x-4">
            {countries.length > 0 && (
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onClick={() => handleOnClick()}
              />
            )}
          </div>
          {convertMutation.isError && (
            <p className="text-customRed">
              {(convertMutation.error as Error)?.message}
            </p>
          )}
        </div>
        {countries.map((country, index) => (
          <div
            className="w-full rounded p-4 mt-2 max-w-6xl bg-listBackground shadow-md"
            key={index}
          >
            <div className="flex flex-row justify-between space-x-4">
              <p className="text-blue flex-1">{country.officialName}</p>
              <p className="flex-1">
                <span>Population: </span>
                {country.population}
              </p>
              <p className="flex-1">
                <span>Currency: </span>
                {country.currencies.join(', ')}
              </p>
              {convertedAmounts !== null && (
                <p className="flex-1">
                  {targetCurrencies}:{' '}
                  <span className="text-customPink">
                    {convertedAmounts[country.currencies[0]]}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CountryList;
