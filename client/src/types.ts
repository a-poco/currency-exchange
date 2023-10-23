export interface CountryProps {
  countries: {
    officialName: string;
    population: string;
    currencies: string[];
    isSupported: boolean;
  }[];
}

export interface ConversionRates {
  [currencyCode: string]: string;
}

export interface Country {
  officialName: string;
  population: string;
  currencies: string[];
  isSupported: boolean;
}
