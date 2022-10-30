import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql'
import { apiRequest } from '../api/vk';
import tagType from './tagType';

const groupType = new GraphQLObjectType({
  name: 'group',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      tags: {
        type: new GraphQLList(tagType),
        resolve(group, args) {
          console.log(group);
          return apiRequest('groups.getTagList', {
            group_id: group.id
          }).then(result => {
            console.log(result);
            return result.items
          })
        }
      },
      screen_name: { type: GraphQLString },
      is_closed: { type: GraphQLInt },
      deactivated: { type: GraphQLString },
      is_admin: { type: GraphQLInt },
      admin_level: { type: GraphQLInt },
      is_member: { type: GraphQLInt },
      is_advertiser: { type: GraphQLInt },
      invited_by: { type: GraphQLInt },
      type: { type: GraphQLString },
      photo_50: { type: GraphQLString },
      photo_100: { type: GraphQLString },
      photo_200: { type: GraphQLString },
      activity: { type: GraphQLString },
      // addresses: { type: GraphQLObjectType },
      age_limits: { type: GraphQLInt },
      // ban_info: { type: GraphQLObjectType },
      can_create_topic: { type: GraphQLInt },
      can_message: { type: GraphQLInt },
      can_post: { type: GraphQLInt },
      can_see_all_posts: { type: GraphQLInt },
      can_upload_doc: { type: GraphQLInt },
      can_upload_story: { type: GraphQLInt },
      can_upload_video: { type: GraphQLInt },
      // city: { type: GraphQLObjectType },
      // contacts: { type: GraphQLList },
      // counters: { type: GraphQLObjectType },
      // country: { type: GraphQLObjectType },
      // cover: { type: GraphQLObjectType },
      // crop_photo: { type: GraphQLObjectType },
      description: { type: GraphQLString },
      fixed_post: { type: GraphQLInt },
      has_photo: { type: GraphQLInt },
      is_favorite: { type: GraphQLInt },
      is_hidden_from_feed: { type: GraphQLInt },
      is_messages_blocked: { type: GraphQLInt },
      // links
      main_album_id: { type: GraphQLInt },
      main_section: { type: GraphQLInt },
      // market
      member_status: { type: GraphQLInt },
      members_count: { type: GraphQLInt },
      // place
      public_date_label: { type: GraphQLString },
      site: { type: GraphQLString },
      start_date: { type: GraphQLString },
      finish_date: { type: GraphQLString },
      status: { type: GraphQLString },
      trending: { type: GraphQLInt },
      verified: { type: GraphQLInt },
      wall: { type: GraphQLInt },
      wiki_page: { type: GraphQLString }
    }
  }
});

export default groupType;
