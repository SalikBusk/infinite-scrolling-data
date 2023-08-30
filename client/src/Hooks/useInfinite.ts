// useInfinite.ts

import { useEffect, useRef } from "react";
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

export const useInfinite = (
  queryKey: QueryKey,
  fetchFunction: (page: number) => Promise<any[]>
) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const response = await fetchFunction(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const lastItemRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastItemRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry, hasNextPage]);

  const items = data?.pages.flatMap((page) => page);

  return {
    items,
    isFetchingNextPage,
    ref,
    lastItemRef,
  };
};
