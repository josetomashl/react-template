export type CookieKey = 'USER_HASH' | 'USER_TOKEN' | 'USER_REFRESH_TOKEN';

export const CookieKeys: Record<CookieKey, string> = {
  USER_HASH: 'customer_hash',
  USER_TOKEN: 'customer_token',
  USER_REFRESH_TOKEN: 'customer_refresh_token'
};
