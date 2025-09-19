import { gql, GraphQLClient } from "graphql-request";
import { useCallback, useMemo } from "react";

export const useGetGroupMessages = () => {
  const endpoint = import.meta.env.VITE_SUBGRAPH_ENDPOINT
  const graphQLClient = useMemo(() => new GraphQLClient(endpoint), [endpoint]);

  const getGroupMessages = useCallback(async () => {
    const query = gql`
      query GetGroupMessages {
        groupMessageSents(orderBy: timestamp, orderDirection: asc) {
          id
          from
          group_id
          message
          timestamp
        }
      }
    `;
    interface GroupMessage {
      id: string;
      from: string;
      group_id: string;
      message: string;
      timestamp: string;
    }
    const data = await graphQLClient.request<{
      groupMessageSents: GroupMessage[];
    }>(query);
    return data.groupMessageSents;
  }, [graphQLClient]);

  return { getGroupMessages };
};
