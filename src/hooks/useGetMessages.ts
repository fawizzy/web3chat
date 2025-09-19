import { gql, GraphQLClient } from 'graphql-request'
import { useCallback, useMemo } from 'react'

export const useGetMessages = () => {
  const endpoint = import.meta.env.VITE_SUBGRAPH_ENDPOINT
  const graphQLClient = useMemo(() => new GraphQLClient(endpoint), [endpoint])

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
