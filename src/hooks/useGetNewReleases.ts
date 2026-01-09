import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getNewReleases } from '../apis/albumApi';
import { getClientCredentialToken } from '../apis/authApi';

const useGetNewReleases = () => {
  const { data: tokenData, isLoading: isTokenLoading } = useQuery({
    queryKey: ['client-credent-token'],
    queryFn: getClientCredentialToken,
  });

  const clientCredentialToken = tokenData?.access_token;

  const queryResult = useInfiniteQuery({
    queryKey: ['new-releases', clientCredentialToken],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getNewReleases(clientCredentialToken, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.albums?.next;

      if (nextUrl) {
        const url = new URL(nextUrl);
        const nextOffset = url.searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!clientCredentialToken,
  });

  const isCombinedLoading = isTokenLoading || (!!clientCredentialToken && queryResult.isLoading);

  return {
    ...queryResult,
    isCombinedLoading,
  };
};

export default useGetNewReleases;
