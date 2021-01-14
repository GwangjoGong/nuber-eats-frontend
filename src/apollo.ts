import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar
} from '@apollo/client'
import { LOCAL_STORAGE_TOKEN } from './constants'
import { setContext } from '@apollo/client/link/context'

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
export const isLoggedInVar = makeVar(Boolean(token))
export const jwtTokenVar = makeVar(token)

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': token || ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar()
            }
          },
          token: {
            read() {
              return jwtTokenVar()
            }
          }
        }
      }
    }
  })
})

export default client
