const {Model} = require('../database');

const options = {
  table: 'Position',
  schema: {
    id: {
      type: 'integer',
      validate: {
        isNumber: true
      }
    },
    portfolioId: {
      type: 'integer',
      validate: {
        isNumber: true
      }
    },
    currency: {
      type: 'string',
      validate: {
        isString: true
      }
    },
    value: {
      type: 'integer',
      validate: {
        isNumber: true
      }
    },
    date: {
      type: 'string',
      validate: {
        isDate: true
      }
    }
  }
};

class Position extends Model {

  constructor(data) {
    super(options.table, options.schema, data);
  }

}

module.exports = (data) => new Position(data);