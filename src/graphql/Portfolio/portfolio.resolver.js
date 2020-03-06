const {Portfolio} = require('../../lib');


const getPortfolios = (src, args, ctx) => {
    const portfolio = new Portfolio(ctx.models);

    return portfolio.getPortfolios(args.where)
}

module.exports.getPortfolios = getPortfolios

