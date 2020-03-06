const validate = require('validate.js');
const _ = require('underscore');

class Model {

  constructor(table, schema, allData) {
    this.table = table;
    this.schema = schema;
    this.data = [];
    this.init(allData);
  }

/**
   * Initialize the data object from data file
*/
  init(allData) {
    if (!allData[this.table]) {
      throw Error('Table or Collection not found.');
    }
    this.data = !this.data.length ? allData[this.table] : [];

  }

/**
   * Get All Data or the selected condition.
   * @returns [Object]
   */
  get(where) {
    if (where && Object.keys(where).length) {
      return _.where(this.data, JSON.parse(JSON.stringify(where)));
    }

return this.data;

  }

/**
   * Get the object of selected table by its primary key.
   * @returns Object
   */
  getById(id, tableName) {

    const ids = [].concat(id);

    return this.data.filter((item) => ids.includes(item.id.toString()));

  }

/**
   * Before Creating this validates against the schema if the entry is valid.
   * @returns createdItem
   */
  validate(item) {

    Object.keys(item).forEach((column) => {

      const validations = (this.schema[column] || {}).validate;

      if (validations) {

        Object.keys((validations)).forEach((key) => {
          if (validations[key] && !validate[key](item[column])) {
             throw Error(`${key} Validation failed for ${column}.`);
          }
        });

      }

    });

  }

/**
   * Push single items into the given table.
   * @returns createdItem
   */

   // TODO auto generated primary key
   create(item) {


    this.validate(item);

    this.data.push(item);

    return item;

  }

  /**
   * Push multiple items at once into the given table / used for position.
   * @returns listOfItems
   */
  async bulkCreate(items) {

    await this.init();

    items.forEach((item) => {
      validate(item);
    });

    this.data = this.data.concat(items);

    return items;

  }


  update(item, where) {
    // TODO

    return Promise.resolve();
  }

  delete(where) {
    // TODO
    return Promise.resolve();
  }

}

module.exports = Model;