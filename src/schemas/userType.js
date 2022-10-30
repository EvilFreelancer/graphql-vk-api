import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql'
import { apiRequest } from '../api/vk'
import albumType from './albumType'
import friendType from './friendType'
import PersonFields from './fields/personFields'
import audioType from './audioType'
import videoType from './videoType'
import wallType from './wallType'
import groupType from './groupType'
import { count, offset } from './utils/utils'

const userType = new GraphQLObjectType({
  name: 'vkUser',
  description: 'Vk.com user',
  fields() {
    return Object.assign({
      albums: {
        args: {
          count,
          offset,
          album_ids: {
            type: new GraphQLList(GraphQLInt),
            description: 'album_ids to get'
          }
        },
        type: new GraphQLList(albumType),
        resolve(user, args) {
          // eslint-disable-next-line camelcase
          const album_ids = args.album_ids ? args.album_ids.join(',') : '';
          return apiRequest('photos.getAlbums', {
            owner_id: user.id,
            // eslint-disable-next-line camelcase
            album_ids,
            count: args.count,
            offset: args.offset
          }).then(result => result.items)
        }
      },
      friends: {
        args: { count, offset },
        type: new GraphQLList(friendType),
        resolve(user, args, ast) {
          const selection = ast.fieldASTs[0].selectionSet.selections;
          let fields = selection.map(item => item.name.value);
          fields = fields.join(',');
          return apiRequest('friends.get', {
            user_id: user.id,
            count: args.count,
            offset: args.offset,
            fields
          }).then(result => result.items)
        }
      },
      audio: {
        args: { count, offset },
        type: new GraphQLList(audioType),
        resolve(user, args) {
          return apiRequest('audio.get', {
            owner_id: user.id,
            count: args.count,
            offset: args.offset
          }).then(result => result.items)
        }
      },
      video: {
        args: { count, offset },
        type: new GraphQLList(videoType),
        resolve(user, args) {
          return apiRequest('video.get', {
            owner_id: user.id,
            count: args.count,
            offset: args.offset
          }).then(result => result.items)
        }
      },
      wall: {
        args: { count, offset },
        type: new GraphQLList(wallType),
        resolve(user, args) {
          return apiRequest('wall.get', {
            owner_id: user.id,
            count: args.count,
            offset: args.offset
          }).then(result => result.items)
        }
      },
      followers: {
        args: { count, offset },
        type: new GraphQLList(friendType),
        resolve(user, args, ast) {
          const selection = ast.fieldASTs[0].selectionSet.selections;
          let fields = selection.map(item => item.name.value);
          fields = fields.join(',');
          return apiRequest('users.getFollowers', {
            user_id: user.id,
            count: args.count,
            offset: args.offset,
            extended: 1,
            fields
          }).then(result => result.items)
        }
      },
      groups: {
        args: { count, offset },
        type: new GraphQLList(groupType),
        resolve(user, args, ast) {
          const selection = ast.fieldASTs[0].selectionSet.selections;
          const fields = selection.map(item => item.name.value).join(',');
          return apiRequest('groups.get', {
            user_id: user.id,
            count: args.count,
            offset: args.offset,
            extended: 1,
            fields
          }).then(result => result.items)
        }
      }
    }, PersonFields)
  }
});

export default userType;
