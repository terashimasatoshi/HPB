
export async function listTikTokVideos(max=5){
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if(!token) return [];
  const r = await fetch("https://open.tiktokapis.com/v2/video/list/",{
    method:"POST",
    headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
    body: JSON.stringify({max_count:max, cursor:0, fields:["title","video_description"]})
  });
  if(!r.ok) return [];
  const j = await r.json();
  return (j.data?.videos||[]).map((v:any)=>({
    source:"tiktok",
    title:v.title||"",
    description:v.video_description||""
  }));
}
