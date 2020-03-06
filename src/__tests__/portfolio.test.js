const {Portfolio} = require('../lib');
const data = require('../database/data');
const models = require('../models')(data);
const portfolio = new Portfolio(models);

describe('Given Portfolio fetch function.', () => {
    it('Should return full Object.', async () => {

        const resp = await portfolio.getPortfolios();

        expect(resp).toHaveLength(data.Portfolio.length)
    });
    it('Should return position with currency EUR.', async () => {

        const resp = await portfolio.getPortfolios({'currency': 'EUR'});

        expect(resp[0].Positions[0].currency).toBe('EUR')
    });
    it('Should Be undefined for currency JPY.', async () => {

        const resp = await portfolio.getPortfolios({'currency': 'JPY'});

        expect(resp[0]).toBeUndefined();
    });
});
