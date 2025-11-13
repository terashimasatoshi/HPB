
export async function searchX(query:string, max=10){
  if(!process.env.X_BEARER_TOKEN) return [];
  const ep = "https://api.x.com/2/tweets/search/recent";
  const params = new URLSearchParams({
    query,
    "tweet.fields":"created_at,lang",
    max_results:String(Math.min(max,100))
  });
  const r = await fetch(`${ep}?${params}`,{
    headers:{Authorization:`Bearer ${process.env.X_BEARER_TOKEN}`}
  });
  if(!r.ok) return [];
  const j = await r.json();
  return (j.data||[]).map((t:any)=>({
    source:"x",
    title:"",
    description:t.text||""
  }));
}
