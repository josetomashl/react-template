export type CookieKey = 'USER_TOKEN' | 'USER_HASH' | 'USER_REFRESH_TOKEN';

export const CookieKeys: Record<CookieKey, string> = {
  USER_TOKEN: 'user_token',
  USER_REFRESH_TOKEN: 'user_refresh_token',
  USER_HASH: 'user_hash',
};
