const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLString
} = require('graphql');
const {GraphQLDateTime} = require('graphql-iso-date');

const PortfolioType = new GraphQLObjectType({
  name: 'Portfolio',
  description: 'A Portfolio object.',
  fields: () => ({
    id: {
      'type': GraphQLInt
    },
    name: {
      'type': GraphQLString
    },
    Positions: {
      type: new GraphQLList(positionType)
    }
  })
});

const positionType = new GraphQLObjectType({
  name: 'Positions',
  description: 'A Position object.',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    portfolioId: {
      type: GraphQLInt
    },
    currency: {
      type: GraphQLString
    },
    value: {
      type: GraphQLFloat
    },
    date: {
      type: GraphQLDateTime
    }
  })
});

const PortfolioWhere = new GraphQLInputObjectType({
  name: 'PortfoliosWhere',
  description: 'Where to pass to the resolver.',
  fields: () => ({
    currency: {
      type: GraphQLString
    },
    date: {
      type: GraphQLDateTime
    }
  })
})

Object.assign(module.exports, {
  PortfolioType,
  PortfolioType,
  PortfolioWhere
});
