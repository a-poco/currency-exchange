import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import CountryList from '../components/CountryList';
import { useCountry } from '../hooks/useData';
import SearchForm from '../components/SearchForm';
import * as api from '../api';
import { Country } from '../types';

interface LoginProps {
  onAuthenticated: (value: boolean) => void;
}

const CountryInfo: React.FC<LoginProps> = ({ onAuthenticated }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [addedCountries, setAddedCountries] = useState<Country[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const countriesData = useCountry(selectedCountry);

  useEffect(() => {
    if (countriesData.isError && countriesData.error instanceof Error) {
      setErrorMessage(countriesData.error.message);
    }
  }, [countriesData.isError, countriesData.error]);

  const handleCountrySubmit = (country: string) => {
    setErrorMessage('');
    setSelectedCountry(country);
  };

  const handleClick = (country: Country) => {
    setErrorMessage('');
    if (!country.isSupported) {
      setErrorMessage('This currency is not supported.');
      return;
    }
    const isCountryAlreadyAdded = addedCountries.some(
      (addedCountry) => addedCountry.officialName === country.officialName,
    );
    if (isCountryAlreadyAdded) {
      setErrorMessage('Country is already added.');
      return;
    }
    setAddedCountries((prevCountries) => [...prevCountries, country]);
  };

  const handleLogout = () => {
    api.logoutUser();
    onAuthenticated(false);
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center mt-4">
        <Button
          name="Logout"
          onClick={handleLogout}
          className="absolute top-0 right-0 mt-2 mr-8 bg-background text-blue"
        />
        <h1>Exchange</h1>
        <SearchForm onSubmit={handleCountrySubmit} />
        {errorMessage && <p className="text-customRed">{errorMessage}</p>}
        <div className="text-center mt-2">
          {countriesData.data &&
            countriesData?.data.map((country: Country, index: number) => (
              <div key={index} className="mt-4">
                <div className="text-left">
                  <p>
                    <span>Official Name:</span> {country?.officialName}
                  </p>
                  <p>
                    <span>Population:</span> {country?.population}
                  </p>
                  <p>
                    <span>Currency:</span> {country.currencies.join(', ')}
                  </p>
                  <Button
                    name="Add to list"
                    onClick={() => handleClick(country)}
                    className="my-4"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <CountryList countries={addedCountries} />
      </div>
    </>
  );
};

export default CountryInfo;
