const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const {readdirSync, statSync} = require('fs');
const {join} = require('path');
const Queries = {};
const queriesFile = new RegExp(/.*.queries.js$/);

function getOnlyDirectories(path) {
  return statSync(path).isDirectory();
}

function processGraphQLFile(file, directory) {
    let destinationObject = null;

    if (queriesFile.exec(file)) {
      destinationObject = Queries;
    }
    if (!destinationObject) {
      return;
    }

    const exportedMembers = require(`./${join(directory, file.substr(0, file.length - 3))}`);

    Object.assign(destinationObject, exportedMembers);
}

readdirSync(__dirname).
filter((file) => getOnlyDirectories(join(__dirname, file))).
forEach((directory) => {
  readdirSync(join(__dirname, directory)).forEach((file) => processGraphQLFile(file, directory));
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'PositionQueries',
      description: 'Positions Queries',
      fields: () => Queries
    })
  });


  module.exports.schema = schema;