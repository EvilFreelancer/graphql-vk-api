import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'
import { apiRequest } from '../api/vk'
import userType from './userType'
import audioType from './audioType'
import { count, offset } from './utils/utils'

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'id/screen_name of user'
          }
        },
        resolve(root, args, ast) {
          const selection = ast.fieldASTs[0].selectionSet.selections;
          const fields = selection.map(item => item.name.value).join(',');
          // eslint-disable-next-line camelcase
          const user_ids = args.user_id;
          // eslint-disable-next-line camelcase
          return apiRequest('users.get', { user_ids, fields }).then(result => result[0]);
        }
      },
      audio: {
        type: new GraphQLList(audioType),
        args: {
          count,
          offset,
          user_id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'id/screen_name of user'
          }
        },
        resolve(root, args, ast) {
          return apiRequest('audio.get', {
            owner_id: args.user_id,
            count: args.count || '',
            offset: args.offset || ''
          }).then(result => result.items)
        }
      }
    }
  })
});
