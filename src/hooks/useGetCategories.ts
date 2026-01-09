import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { CategoryRequest } from '../models/category';
import { getCategories } from '../apis/CategoryApi';
import { getClientCredentialToken } from '../apis/authApi';

const useGetCategories = ({ locale, limit }: CategoryRequest) => {
  const { data: tokenData, isLoading: isTokenLoading } = useQuery({
    queryKey: ['client-credent-token'],
    queryFn: getClientCredentialToken,
  });

  const clientCredentialToken = tokenData?.access_token;

  const queryResult = useInfiniteQuery({
    queryKey: ['category', locale, limit, clientCredentialToken],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error('no tokens available.');
      }

      return getCategories(clientCredentialToken, { locale, limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.categories?.next;

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

export default useGetCategories;
