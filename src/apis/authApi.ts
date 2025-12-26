import axios from 'axios';
import { clientId, clientSecretId } from '../configs/authConfig';
import type { ClientCredentialTokenResponse } from '../models/auth';

const encodedBase64 = (data: string): string => {
  return btoa(data);
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    });

    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        Authorization: `Basic ${encodedBase64(clientId + ':' + clientSecretId)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch client credential token');
  }
};
