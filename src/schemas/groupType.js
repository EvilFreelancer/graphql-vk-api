import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql'
import { apiRequest } from '../api/vk';
import tagType from './tagType';

const _string = { type: GraphQLString };
const _int = { type: GraphQLInt };

const groupType = new GraphQLObjectType({
  name: 'group',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      tags: {
        type: new GraphQLList(tagType),
        resolve(group, args) {
          return apiRequest('groups.getTagList', {
            group_id: group.id
          }).then(result => {
            return result.items
          })
        }
      },
      screen_name: _string,
      is_closed: _int,
      deactivated: _string,
      is_admin: _int,
      admin_level: _int,
      is_member: _int,
      is_advertiser: _int,
      invited_by: _int,
      type: _string,
      photo_50: _string,
      photo_100: _string,
      photo_200: _string,
      activity: _string,
      // addresses: { type: GraphQLObjectType },
      age_limits: _int,
      // ban_info: { type: GraphQLObjectType },
      can_create_topic: _int,
      can_message: _int,
      can_post: _int,
      can_see_all_posts: _int,
      can_upload_doc: _int,
      can_upload_story: _int,
      can_upload_video: _int,
      // city: { type: GraphQLObjectType },
      // contacts: { type: GraphQLList },
      // counters: { type: GraphQLObjectType },
      // country: { type: GraphQLObjectType },
      // cover: { type: GraphQLObjectType },
      // crop_photo: { type: GraphQLObjectType },
      description: _string,
      fixed_post: _int,
      has_photo: _int,
      is_favorite: _int,
      is_hidden_from_feed: _int,
      is_messages_blocked: _int,
      // links
      main_album_id: _int,
      main_section: _int,
      // market
      member_status: _int,
      members_count: _int,
      // place
      public_date_label: _string,
      site: _string,
      start_date: _string,
      finish_date: _string,
      status: _string,
      trending: _int,
      verified: _int,
      wall: _int,
      wiki_page: _string
    }
  }
});

export default groupType;
