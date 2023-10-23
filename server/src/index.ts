import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

require('dotenv').config();

interface RequestWithUser extends Request {
  user?: jwt.JwtPayload | string;
}
interface ConversionResult {
  [key: string]: string;
}

const app = express();
app.use(express.json());
const PORT = 8000;
const FIXER_API_KEY = process.env.FIXER_API_KEY!!;
const SECRET_KEY = process.env.SECRET_KEY!!;

app.get('/api/country/:name', verifyJWT, async (req, res) => {
  const countryName = req.params.name;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`,
    );
    const countries = response.data;

    if (!countries) {
      return res.status(404).send('Country not found.');
    }

    const data = countries.map(
      (country: {
        name: { official: string };
        population: number;
        currencies: { [key: string]: string };
      }) => {
        const officialName = country.name?.official || '';
        const populationString = country.population?.toString() || '';
        const currencyCodes = country.currencies
          ? Object.keys(country.currencies)
          : [];
        const isSupported = currencyCodes.includes('EUR');

        return {
          officialName,
          population: populationString,
          currencies: currencyCodes,
          isSupported,
        };
      },
    );

    res.json(data);
  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).send('Error fetching country data.');
  }
});

app.get('/api/convert/SEK/:amount', verifyJWT, async (req, res) => {
  const amountToConvert = parseFloat(req.params.amount);
  const targetCurrencies =
    (req.query.targetCurrencies as string).split(',') || [];

  if (isNaN(amountToConvert)) {
    return res.status(400).send('Invalid amountToConvert provided.');
  }

  if (!targetCurrencies.length) {
    return res.status(400).send('No target currencies provided.');
  }

  let conversionResult: ConversionResult = {};

  try {
    const conversionPromises = targetCurrencies.map(async (currency) => {
      const response = await axios.get('http://data.fixer.io/api/latest', {
        params: {
          access_key: FIXER_API_KEY,
          base: currency,
          symbols: 'SEK',
        },
      });

      if (response.data.success === false) {
        throw new Error(
          `Conversion rate not supported for currency: ${currency}`,
        );
      }

      const rate = response.data.rates.SEK;

      if (!rate) {
        throw new Error(`Conversion rate not found for currency: ${currency}`);
      }
      const convertedAmount = amountToConvert / rate;
      conversionResult[currency] = convertedAmount.toFixed(2);
    });

    await Promise.all(conversionPromises);

    res.json(conversionResult);
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    res.status(500).send('Error fetching conversion rate.');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = {
    username: 'test@test.se',
    password: '1234',
  };

  if (!user || user.password !== password || user.username != username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return res.json({ token });
});

function verifyJWT(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): any {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    req.user = decoded;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
