import { useMemo, useRef } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

import { useAuth } from '@/auth';
import { config } from '@/config';

export function GraphQLProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { getToken, signOut } = useAuth();
  const signOutRef = useRef(signOut);
  signOutRef.current = signOut;

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${config.apiUrl}/graphql`,
      fetch: async (input, init) => {
        const response = await globalThis.fetch(input, init);
        if (response.status === 401) {
          void signOutRef.current();
        }
        return response;
      },
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();
      return {
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : undefined),
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
