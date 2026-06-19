export interface FollowingItem {
  title: string;
  string_list_data: { href: string; timestamp: number }[];
}

export interface FollowerItem {
  string_list_data: { href: string; value: string; timestamp: number }[];
}

export interface UserEntry {
  username: string;
  timestamp: number;
}

export type TabKey = "mutual" | "notFollowBack" | "notFollowingBack";
export type CompareTabKey = "newFollowers" | "unfollowers" | "newFollowing" | "unfollowing";
export type ViewMode = "single" | "compare";
