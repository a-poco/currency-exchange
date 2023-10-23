import request from 'supertest';
import app from './index.ts';

describe('API Endpoints', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'test@test.se', password: '1234' });
    token = response.body.token;
  });

  describe('/api/country/:name', () => {
    it('should fetch country data for valid country name', async () => {
      const response = await request(app)
        .get('/api/country/usa')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('officialName');
      expect(response.body[0]).toHaveProperty('population');
      expect(response.body[0]).toHaveProperty('currencies');
      expect(response.body[0]).toHaveProperty('isSupported');
    });

    it('should support only countries with euro', async () => {
      const response = await request(app)
        .get('/api/country/spain')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('isSupported');
      expect(response.body[0].isSupported).toBe(true);
    });
  });

  describe('/api/convert/SEK/:amount', () => {
    it('should convert valid SEK amount to EUR', async () => {
      const amount = 100;
      const targetCurrency = 'EUR';

      const response = await request(app)
        .get(`/api/convert/SEK/${amount}?targetCurrencies=${targetCurrency}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(targetCurrency);
    });
  });

  describe('/api/login', () => {
    it('should return JWT token for valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'test@test.se', password: '1234' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'wronguser@test.se', password: '1234' });

      expect(response.status).toBe(401);
    });
  });
});
