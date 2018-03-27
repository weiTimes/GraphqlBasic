import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    greeting: {
      type: GraphQLString
    }
  }
});

export default GraphQLSchema({
  query: QueryRootType
});
