import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

export const count = {
  type: GraphQLInt,
  description: 'Limit items to show',
  defaultValue: ''
};

export const offset = {
  type: GraphQLInt,
  description: 'Offset items list',
  defaultValue: ''
};

// eslint-disable-next-line camelcase
export const user_id = {
  type: new GraphQLNonNull(GraphQLString),
  description: 'id/screen_name of user'
};
