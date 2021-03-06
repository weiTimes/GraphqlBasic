import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

// /graphql => 启用graphql客户端
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true // 客户端
  })
);

app.listen(8787);
