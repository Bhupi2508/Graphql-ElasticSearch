var express = require('express');
var Schema = require('./data/schema');
var Resolvers = require('./data/resolver');
//var Mocks = require('./data/mocks');

// following varibles are initialized, as per the apollo version  0.3.3
var apolloExpress = require('apollo-server').apolloExpress;
var graphiqlExpress = require('apollo-server').graphiqlExpress;
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var addMockFunctionsToSchema = require('graphql-tools').addMockFunctionsToSchema;

var cors = require('cors');


// body parsed is required to parse the request body content
var bodyParser = require('body-parser');

// graphiql listens at the following Port
const GRAPHQL_PORT = 8090;

// initiate the express app
const graphQLServer = express();

// Define the executable schema 
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true,  
});

//The * value allows access from any third-party site
graphQLServer.use('*', cors());

graphQLServer.use(bodyParser.urlencoded({ extended: false }));
graphQLServer.use(bodyParser.json());


// pass the schema & resolver definitions to the graphQL server
graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {},
}));

// in latest version, grapiql has separate end-point
graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));


// server listens on the port defined above
graphQLServer.listen(GRAPHQL_PORT);

module.exports = graphQLServer;

console.log("***** GraphQL server is listening");