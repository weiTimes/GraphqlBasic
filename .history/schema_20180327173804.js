/*
 * @Author: yewei 
 * @Date: 2018-03-27 15:56:27 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-03-27 17:38:03
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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
});

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
    },
    author: {
      type: UserType,
      resolve: obj => {
        return axios
          .get(`${API_BASE}/users/${obj.author}`)
          .then(response => response.data);
      }
    }
  }
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: UserType,
      resolve: obj => {
        return axios
          .get(`${API_BASE}/users/${obj.author}`)
          .then(response => response.data);
      }
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
        id: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, context) => {
        return axios
          .get(`${API_BASE}/posts/${args.id}`)
          .then(response => response.data);
      }
    }
  }
});

export default new GraphQLSchema({
  query: QueryRootType // 查询
});
