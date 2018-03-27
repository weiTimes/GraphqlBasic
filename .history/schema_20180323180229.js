import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';
import axios from 'axios';

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    greeting: {
      type: GraphQLString,
      resolve: () => 'hello graphql!'
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return axios.get(`${API_BASE}/posts`);
      }
    }
  }
});

export default new GraphQLSchema({
  query: QueryRootType // 查询
});
