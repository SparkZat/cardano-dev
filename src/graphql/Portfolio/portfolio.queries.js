
/**
  * getPortfolios.
  * Will take where object as parameter to get all the portfolio based on that condition.
  * @param {where}
  * @return {Promise<{data}>}
  */
const {getPortfolios} = require('./portfolio.resolver'); // resolver
const {PortfolioType, PortfolioWhere} = require('./portfolio.types');
const {
  GraphQLList,
} = require('graphql');

const getPortfolio = {
  type: new GraphQLList(PortfolioType),
  description: 'Get a list of Portfolios',
  args: {
    where: {
      type: PortfolioWhere
    }
  },
  resolve: getPortfolios
};

Object.assign(module.exports, {
  getPortfolio // more queries will append here
});
