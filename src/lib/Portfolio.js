class Portfolio {

    constructor(models) {
        this.models = models;
    }

    async getPortfolios(where) {
        const positions = await this.models.Position.get(where);
        const positionMap = positions.reduce((all, position) => {

            all[position.portfolioId] = all[position.portfolioId] || [];
            all[position.portfolioId].push(position);

            return all;

        }, {});
        const portfolios = await this.models.Portfolio.getById(Object.keys(positionMap));


return portfolios.map((portfolio) => ({
            ...portfolio,
            Positions: positionMap[portfolio.id]
        }));
    }


    async creatPortfolio(item) {
        const positions = item.positions;
        const portfolio = await this.models.Portfolio.create({id: item.id, name: item.name});

        await this.models.Position.bulkCreate(positions.map((position) => ({...position, portfolioId: portfolio.id})));

        return portfolio;
    }

}

module.exports = Portfolio;