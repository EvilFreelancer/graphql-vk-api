import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const cityType = new GraphQLObjectType({
  name: 'UserCity',
  fields() {
    return {
      id: { type: GraphQLID }, title: { type: GraphQLString }
    }
  }
});

export default cityType;
