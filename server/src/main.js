const express = require('express');
const server = require('./apolo');
const cors = require('cors')

const app = express();
server.applyMiddleware({ app });

app.use(cors())
app.listen({ port: 4021 }, () =>
  console.log('Now browse to http://localhost:4021' + server.graphqlPath)
);