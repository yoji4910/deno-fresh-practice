/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { microcmsClient } from "../libs/client.ts";

interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
}

console.log(Deno.env.get("API_KEY"));
// カスタムハンドラを定義
// 「handler」という名前でnamed exportするルール
export const handler: Handlers<Array<Article> | null> = {
  async GET(_, ctx) {
    const resp = await microcmsClient.get({ endpoint: "articles" });
    if (resp.status == 404) {
      return ctx.render(null);
    }
    return ctx.render(resp.contents);
  },
};

// ページコンポーネントのレンダリング
export default function Page({ data }: PageProps<Array<Article> | null>) {
  if (!data) return;
  return (
    <>
      <h1
        class={tw`container mx-auto p-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3`}
      >
        記事一覧
      </h1>
      <div
        class={tw`container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5`}
      >
        {data.map((article) => (
          <a
            href={`/articles/${article.id}`}
            class={`rounded overflow-hidden shadow-lg`}
          >
            <img class={tw`w-full`} src={article.eyecatch.url} alt="Sunset" />
            <div class={tw`p-6 py-4`}>{article.title}</div>
            <div class={tw`px-6 pt-4 pb-2`}>
              {article.category && (
                <span
                  class={tw`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
                >
                  #{article.category.name}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
