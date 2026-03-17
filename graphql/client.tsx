import { createContext, useContext, useMemo, useRef } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

import { useAuth } from '@/auth';
import { config } from '@/config';

// Context to share the raw Apollo Client instance outside of Apollo's own hooks
const ApolloClientContext = createContext<ApolloClient | null>(null);

export function useApolloClientInstance(): ApolloClient {
  const client = useContext(ApolloClientContext);
  if (!client) {
    throw new Error('useApolloClientInstance must be used within GraphQLProvider');
  }
  return client;
}

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

    const errorLink = onError(({ error }) => {
      if (CombinedGraphQLErrors.is(error)) {
        const isAuthError = error.errors.some(
          (e) =>
            e.extensions?.['code'] === 'UNAUTHENTICATED' ||
            e.message.toLowerCase().includes('authentication required'),
        );
        if (isAuthError) {
          void signOutRef.current();
        }
      }
    });

    return new ApolloClient({
      link: errorLink.concat(authLink).concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getToken]);

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
}
