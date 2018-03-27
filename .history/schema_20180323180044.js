import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    greeting: {
      type: GraphQLString,
      resolve: () => 'hello graphql!'
    },
    posts: {}
  }
});

export default new GraphQLSchema({
  query: QueryRootType // 查询
});
