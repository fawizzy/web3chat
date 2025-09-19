import { gql, GraphQLClient } from 'graphql-request'
import { useCallback, useMemo } from 'react'

export const useGetFriends = () => {
    const endpoint = import.meta.env.VITE_SUBGRAPH_ENDPOINT
    const graphQLClient = useMemo(() => new GraphQLClient(endpoint), [endpoint])

    type Friend = {
        id: string
        name: string
        user: string
        uri: string
    }

    

    const getFriends =useCallback(async () => {
        const query = gql`
            query GetAllFriends {
                userRegistereds(first: 5) {
                    id
                    user
                    name
                    uri
                }
            }
        `
        const data = await graphQLClient.request<{ userRegistereds: Friend[] }>(query)
        return data.userRegistereds
    },[graphQLClient])

    return { getFriends }
}