/*
 * @Author: yewei 
 * @Date: 2018-03-27 15:56:27 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-03-27 16:10:25
 * 
 * 定义schema类型 => 返回的数据及数据类型
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';
import axios from 'axios';

const API_BASE = 'http://localhost:3300'; // json-server

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  }
});

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    greeting: {
      type: GraphQLString,
      resolve: () => 'hello graphql!'
    },
    posts: {
      type: new GraphQLList(PostType), // 列表
      resolve: () => {
        return axios.get(`${API_BASE}/posts`).then(response => response.data);
      }
    },
    post: {
      type: PostType,
      args: {
        id: GraphQLString
      }
    }
  }
});

export default new GraphQLSchema({
  query: QueryRootType // 查询
});
