const {Portfolio} = require('./lib');
const models = require('./models');

const portfolio = new Portfolio(models);

portfolio.getPortfolios().then((data) => {
  console.log(data);
});