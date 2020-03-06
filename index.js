const express = require('express');
const graphqlHTTP = require('express-graphql');
const {schema} = require('./src/graphql');

async function setupServer() {
  const DatabaseClient = require('./src/database/database');
  const connection = await DatabaseClient.connect();
  const data = await connection.load();
  const models = require('./src/models')(data);
  const app = express();

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: {
        models,
        connection
      }
    })
  );

  app.listen(3000);
  console.log('Server Listening on 3000');
  //Usually i would set the rule no-console in my eslint but for sake of assignment i am ignoring that, a better approach that i use is create a logger class
  // 2 logs are also present in database class
}

setupServer();