import type { FollowingItem, FollowerItem, UserEntry } from "../types";

export function parseFollowing(raw: unknown): UserEntry[] {
  const obj = raw as { relationships_following?: FollowingItem[] };
  if (!obj?.relationships_following) return [];
  return obj.relationships_following.map((item) => ({
    username: item.title?.toLowerCase() ?? "",
    timestamp: item.string_list_data?.[0]?.timestamp ?? 0,
  }));
}

export function parseFollowers(raw: unknown): UserEntry[] {
  const arr = raw as FollowerItem[];
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => ({
    username: item.string_list_data?.[0]?.value?.toLowerCase() ?? "",
    timestamp: item.string_list_data?.[0]?.timestamp ?? 0,
  }));
}
