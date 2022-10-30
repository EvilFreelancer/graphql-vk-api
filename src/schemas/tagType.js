import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const tagType = new GraphQLObjectType({
  name: 'groupTag',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      color: { type: GraphQLString }
    }
  }
});

export default tagType;
