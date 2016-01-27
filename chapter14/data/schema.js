import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Tweet,
  getTweet
} from './database';


var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Tweet') {
      return getTweet(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Tweet) {
      return tweetType;
    } else {
      return null;
    }
  }
);

var tweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'A tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
    content: {
      type: GraphQLString,
      description: 'Content of Tweet',
      resolve: (tweet) => {
        tweet.content
      }

    }
  }),
  interfaces: [nodeInterface],
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    tweet: {
      type: tweetType,
      resolve: () => getTweet(),
    },
  }),
});


export var Schema = new GraphQLSchema({
  query: queryType,
});
