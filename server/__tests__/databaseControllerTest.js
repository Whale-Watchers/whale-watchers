const request = require('supertest');
// const databaseController = require('../controllers/databaseController');
const server = 'http://localhost:3000';

jest.setTimeout(30000);

describe('databaseController test', () => {

  describe('GET request to getHoldings', () => {

    it('returns an object with eth, erc2 and erc721', async () => {
      const response = await request(server)
      .get(`/database/getHoldings/0xbea020c3bd417f30de4d6bd05b0ed310ac586cc0`)
      .set('Accept', 'application/json')
      expect(response.status).toEqual(200);
      expect(response.header["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty('eth');
      expect(response.body).toHaveProperty('erc20');
      expect(response.body).toHaveProperty('erc721');
    })

    it('')
  })
})