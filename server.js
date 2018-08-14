const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//  GraphQL express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
require('dotenv').config();

const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//  Create Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

//  Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

// Initialize express 
const app = express();
const PORT = process.env.PORT || 3333;

// Create Graphiql application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql' }))

// Connect schemas with GraphQL
app.use('/graphql',
bodyParser.json(), 
graphqlExpress({
  schema,
  context: {
    Recipe,
    User
  }
}))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});