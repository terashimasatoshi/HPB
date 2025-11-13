
"use client";
import { useState } from "react";

const DEFAULT_THEMES = [
  "METEO美髪矯正",
  "オーガニックカラー",
  "頭浸浴スパ",
  "季節の乾燥対策"
];

const SEASONS = ["春","梅雨","夏","秋","冬"];

export default function Home(){
  const [theme, setTheme] = useState("");
  const [season, setSeason] = useState("");
  const [freeword, setFreeword] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(){
    setLoading(true);
    setBody("");
    const res = await fetch("/api/generate",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ theme, freeword, season })
    });
    const json = await res.json();
    setBody(json.body || "");
    setLoading(false);
  }

  return (
    <main style={{maxWidth:860, margin:"40px auto", padding:16}}>
      <h1 style={{fontSize:28, fontWeight:700}}>美容ブログ自動生成</h1>

      <section style={{marginTop:24}}>
        <div>既定テーマ</div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:8}}>
          {DEFAULT_THEMES.map(t=>(
            <button key={t} onClick={()=>setTheme(t)}
              style={{padding:"8px 12px", border:"1px solid #ddd", borderRadius:8,
                background: theme===t ? "#eef2ff" : "#fff"}}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section style={{marginTop:16}}>
        <div>季節</div>
        <div style={{display:"flex", gap:8, marginTop:8}}>
          {SEASONS.map(s=>(
            <button key={s} onClick={()=>setSeason(s)}
              style={{padding:"6px 10px", border:"1px solid #ddd", borderRadius:8,
                background: season===s ? "#e0f2fe" : "#fff"}}>
              {s}
            </button>
          ))}
        </div>
      </section>

      <section style={{marginTop:16}}>
        <div>フリーワード</div>
        <input
          value={freeword}
          onChange={e=>setFreeword(e.target.value)}
          placeholder="例: 梅雨 くせ毛 対策"
          style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:8}}
        />
      </section>

      <section style={{marginTop:16}}>
        <button onClick={generate} disabled={loading}
          style={{padding:"10px 16px", background:"#111", color:"#fff",
            borderRadius:8, border:"1px solid #111"}}>
          {loading?"生成中...":"記事を作成"}
        </button>
      </section>

      <section style={{marginTop:24}}>
        <div>プレビュー</div>
        <textarea readOnly value={body}
          style={{width:"100%", minHeight:260, padding:12,
            border:"1px solid #ddd", borderRadius:8}} />
        <button onClick={()=>navigator.clipboard.writeText(body)}
          style={{marginTop:8, padding:"8px 12px", borderRadius:8,
          border:"1px solid #ddd"}}>
          本文をコピー
        </button>
      </section>
    </main>
  );
}
