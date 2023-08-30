import React, { useEffect, useRef } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
  { id: 4, title: "Post 4" },
  { id: 5, title: "Post 5" },
  { id: 6, title: "Post 6" },
];

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 2, page * 2);
};

const Infinite = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [posts.slice(0, 2)],
        pageParams: [1],
      },
    }
  );
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <h1 className="text-2xl">posts:</h1>
      <div className="flex flex-col gap-5">
        {_posts?.map((post, i) => {
          if (i === _posts.length - 1)
            return (
              <div className="w-full h-80 bg-black text-white" key={post.id} ref={ref}>
                {post.title}
              </div>
            );
          return <div className="h-80 bg-black" key={post.id}>{post.title}</div>;
        })}
      </div>
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? "loader mere..."
          : (data?.pages.length ?? 0) < 3
          ? "Vis mere"
          : "ikke flere"}
      </button>
    </div>
  );
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Infinite />
    </QueryClientProvider>
  );
}
