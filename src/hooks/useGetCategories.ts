import { useInfiniteQuery } from '@tanstack/react-query';
import type { CategoryRequest } from '../models/category';
import { getCategories } from '../apis/CategoryApi';
import useClientCredentialToken from './useClientCredentialToken';

const useGetCategories = ({ locale, limit }: CategoryRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
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
  });
};

export default useGetCategories;
