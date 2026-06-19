import { AvatarImg } from "./AvatarImg";
import { formatTimestamp } from "../utils/format";
import type { UserEntry } from "../types";
import { useLang } from "../contexts/LangContext";

export function UserCard({ user }: { user: UserEntry }) {
  const { lang } = useLang();
  const date = formatTimestamp(user.timestamp, lang === "id" ? "id-ID" : "en-US");
  return (
    <a
      href={`https://instagram.com/${user.username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-1.5 rounded-lg bg-white/5 p-3 transition-all duration-200 hover:bg-white/10 hover:scale-[1.03]"
    >
      <AvatarImg
        username={user.username}
        className="h-12 w-12 rounded-full ring-2 ring-white/10 transition-all group-hover:ring-white/30"
      />
      <span className="w-full truncate text-center text-xs font-medium text-white/80 group-hover:text-white">
        @{user.username}
      </span>
      {date && (
        <span className="w-full truncate text-center text-[10px] text-white/30">
          {date}
        </span>
      )}
    </a>
  );
}
