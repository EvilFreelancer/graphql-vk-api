import express from 'express';
import graphqlHTTP from 'express-graphql';
import vkGraphql from './src/vk-graphql';

// Read env variables from file
require('dotenv').config();
const bind = process.env.APP_BIND || '0.0.0.0';
const port = process.env.APP_PORT || 3001;
const endpoint = process.env.APP_ENDPOINT || '/graphql';
const token = process.env.VK_API_KEY;

// Set token for work with API
vkGraphql.setToken(token);

// Init application
const app = express();

// Set routes
app.use(endpoint, graphqlHTTP({ schema: vkGraphql.Schema, graphiql: true }));

// Start application in foreground
app.listen(port, bind, () => {
  console.log(`App started at ${bind}:${port}${endpoint}`);
});
