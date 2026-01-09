import axios from 'axios';
import { PAGE_LIMIT, SPOTIFY_BASE_URL } from '../configs/commonConfig';
import type { GetNewReleasesResponse } from '../models/album';

export const getNewReleases = async (
  clientCredentialToken: string,
  pageParam: number
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases`, {
      params: {
        limit: PAGE_LIMIT,
        offset: pageParam,
      },
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('fail to fetch new releases');
  }
};
