import { gql, GraphQLClient } from 'graphql-request'
import { useCallback } from 'react'

export const useGetMessages = () => {
  const endpoint =
    'https://api.studio.thegraph.com/query/120721/web-3-chat/version/latest'
  const graphQLClient = new GraphQLClient(endpoint)

const getMessages = useCallback(
    async (from: string, to: string) => {
        const query = gql`
            query GetMessages($from: String!, $to: String!) {
                messageSents(
                    where: {
                        or: [
                            { from: $from, to: $to }
                            { from: $to, to: $from }
                        ]
                    }
                    orderBy: timestamp
                    orderDirection: asc
                ) {
                    id
                    from
                    to
                    message
                    timestamp
                }
            }
        `

        const variables = { from, to }

        interface Message {
            id: string
            from: string
            to: string
            message: string
            timestamp: string
        }

        const data = await graphQLClient.request<{ messageSents: Message[] }>(
            query,
            variables
        )

        return data.messageSents
    },
    [graphQLClient]
)

  return { getMessages }
}
