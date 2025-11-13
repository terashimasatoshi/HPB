
const YT = "https://www.googleapis.com/youtube/v3/search";

export async function searchYouTube(q:string, max=5){
  if(!process.env.YOUTUBE_API_KEY) return [];
  const params = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY,
    part:"snippet",
    type:"video",
    order:"date",
    q,
    maxResults:String(max)
  });
  const r = await fetch(`${YT}?${params}`);
  if(!r.ok) return [];
  const j = await r.json();
  return (j.items||[]).map((it:any)=>({
    source:"youtube",
    title:it.snippet?.title||"",
    description:it.snippet?.description||""
  }));
}
