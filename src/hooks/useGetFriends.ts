import { gql, GraphQLClient } from 'graphql-request'

export const useGetFriends = () => {
    const endpoint = 'https://api.studio.thegraph.com/query/120721/web-3-chat/version/latest'
    const graphQLClient = new GraphQLClient(endpoint)

    type Friend = {
        id: string
        name: string
        user: string
        uri: string
    }

    

    const getFriends = async () => {
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
    }

    return { getFriends }
}