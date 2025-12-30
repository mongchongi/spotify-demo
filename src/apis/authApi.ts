import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET_ID } from '../configs/authConfig';
import type { ClientCredentialTokenResponse, ExchangeTokenResponse } from '../models/auth';
import { REDIRECT_URI } from '../configs/commonConfig';

const encodedBase64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET_ID}`);

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    });

    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        Authorization: `Basic ${encodedBase64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch client credential token');
  }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try {
    const url = 'https://accounts.spotify.com/api/token';

    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error('missing required parameters');
    }

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to fetch token');
  }
};
