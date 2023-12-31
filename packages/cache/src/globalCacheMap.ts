export interface Cache {
  styleSheetText: string;
  cached: Set<string>;
  temp: {
    hash: string;
    styleText: string;
  }[];
}

export interface CacheMap {
  current: {
    [k: string]: Cache;
  };
}

/**
 * 管理全局的cache
 */
export const globalCacheMap: CacheMap = {
  current: {},
};
