
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePost(contextBullets: string[], theme: string){
  const sys = `あなたは美容専門の編集者。ホットペッパービューティー用ブログを作成。
- 全角1000文字以内
- 改行80以下
- 絵文字・記号を使わない`;

  const user = `テーマ: ${theme}
参考:
${contextBullets.map(b=>"・"+b).join("\n")}
短く専門的にまとめて。`;

  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature:0.4,
    messages:[
      {role:"system", content:sys},
      {role:"user", content:user}
    ]
  });
  return resp.choices[0]?.message?.content || "";
}
