
const emojiRegex = /\p{Extended_Pictographic}/gu;
const symbolRegex = /\p{S}/gu;

function eastAsianWidth(ch:string){
  const code = ch.codePointAt(0);
  if(!code) return 1;
  const ascii = code <=0x7f;
  const half = code>=0xff61 && code<=0xff9f;
  return (ascii||half)?0.5:1;
}

export function sanitizeForHotPepper(input:string){
  let t = input.replace(/\r\n/g,"\n");
  t = t.replace(emojiRegex,"");
  t = t.replace(symbolRegex,"");
  const lines = t.split("\n");
  if(lines.length>80) t = lines.slice(0,80).join("\n");

  let out="";
  let w=0;
  for(const ch of t){
    const ww = eastAsianWidth(ch);
    if(w+ww>1000) break;
    out+=ch;
    w+=ww;
  }
  return out.trim();
}
