
import { NextRequest, NextResponse } from "next/server";
import { searchYouTube } from "@/lib/fetchers/youtube";
import { searchX } from "@/lib/fetchers/x";
import { searchInstagramByHashtag } from "@/lib/fetchers/instagram";
import { listTikTokVideos } from "@/lib/fetchers/tiktok";
import { generatePost } from "@/lib/llm";
import { sanitizeForHotPepper } from "@/lib/sanitize";
import { SEASON_QUERIES } from "@/lib/season";

export async function POST(req: NextRequest){
  const { theme, freeword, season } = await req.json();

  const seasonHints = season ? (SEASON_QUERIES[season] || []) : [];
  const q = freeword?.trim() || theme || "艶髪 ケア 美容室";
  const qMerged = [q, ...seasonHints].join(" ");

  const [yt, xx, ig, tt] = await Promise.all([
    searchYouTube(qMerged),
    searchX(qMerged),
    searchInstagramByHashtag(q.replace(/\s+/g,"")),
    listTikTokVideos()
  ]);

  const contexts = [...yt, ...xx, ...ig, ...tt]
    .filter(x=>x?.description || x?.title)
    .slice(0,16)
    .map(x=> (x.title ? x.title : x.description))
    .map(s=>s.replace(/\s+/g," ").trim())
    .map(s=> s.length>120 ? s.slice(0,120)+"…" : s);

  const raw = await generatePost(contexts, theme || q);
  const safe = sanitizeForHotPepper(raw);

  return NextResponse.json({ok:true, body:safe});
}
