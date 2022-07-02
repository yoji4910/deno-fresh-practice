/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

// カスタムハンドラを定義
// 「handler」という名前でnamed exportするルール
export const handler: Handlers<User | null> = {
  // カスタムGet handlerを定義
  // カスタムHeaderをレスポンスに追加する
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status == 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    // 渡したdata(ここではuser)はページコンポーネントのproops.dataでアクセスできる
    return ctx.render(user);
  },
};

// ページコンポーネントのレンダリング
export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not fount</h1>;
  }

  return (
    <div>
      <img src={data.avatar_url} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
    </div>
  );
}
