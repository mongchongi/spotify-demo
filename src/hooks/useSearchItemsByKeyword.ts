import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { searchItemsByKeyword } from '../apis/searchApi';
import type { SearchRequestParams } from '../models/search';
import { getClientCredentialToken } from '../apis/authApi';

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const { data: tokenData, isLoading: isTokenLoading } = useQuery({
    queryKey: ['client-credent-token'],
    queryFn: getClientCredentialToken,
  });

  const clientCredentialToken = tokenData?.access_token;

  const queryResult = useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error('no token available');
      }

      return searchItemsByKeyword(clientCredentialToken, { ...params, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
    enabled: !!params.q && !!clientCredentialToken,
  });

  return { ...queryResult, isCombinedLoading: isTokenLoading || (!!clientCredentialToken && queryResult.isLoading) };
};

export default useSearchItemsByKeyword;
