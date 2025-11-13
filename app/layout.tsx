
export const metadata = {
  title: "美容ブログ自動生成アプリ",
  description: "ホットペッパービューティー用、美容特化ブログ自動生成ツール"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin:0, padding:0, fontFamily:"sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
