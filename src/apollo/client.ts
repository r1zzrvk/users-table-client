import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql',
})

export default client
