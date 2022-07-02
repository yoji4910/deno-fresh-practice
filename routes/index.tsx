/** @jsx h */
import { h } from "preact";
import { Handlers } from "$fresh/server.ts";

// カスタムハンドラを定義
// 「handler」という名前でnamed exportするルール
export const handler: Handlers = {
  // カスタムGet handlerを定義
  // カスタムHeaderをレスポンスに追加する
  async GET(req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

// ページコンポーネントのレンダリング
export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
