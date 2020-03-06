const {Model} = require('../database');

const options = {
  table: 'Portfolio',
  schema: {
    id: {
      type: 'integer',
      validate: {
        isNumber: true
      }
    },
    name: {
      type: 'string',
      validate: {
        isString: true
      }
    }
  }
};

class Portfolio extends Model {

  constructor(data) {
    super(options.table, options.schema, data);
  }

}

module.exports = (data) => new Portfolio(data);