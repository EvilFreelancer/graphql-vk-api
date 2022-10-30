import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql'

const groupType = new GraphQLObjectType({
  name: 'group',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
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
      photo_200: { type: GraphQLString }
    }
  }
});

export default groupType;
