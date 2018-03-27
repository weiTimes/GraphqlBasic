import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

app.use('/graphql', graphqlHTTP);

app.listen(8787);
