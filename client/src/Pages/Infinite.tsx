import React, { useEffect, useRef } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

// images
import Picture from "../Assets/Qoornoq-sommer-tur-billede-i-land-over-kravpladsen.jpg";
import picture2 from '../Assets/Qoornoq-sommer-tur-billede-i-Qoornoq-land.jpg'
import picture3 from '../Assets/Qoornoq-tur-billede-i-qoornoq-land.jpg'
import picture4 from '../Assets/Qoornoq-vinter-tur.jpg'


const posts = [
  {
    id: 1,
    title: "Post 1",
    thumbail: Picture,
  },
  {
    id: 2,
    title: "Post 2",
    thumbail: picture2,
  },
  {
    id: 3,
    title: "Post 3",
    thumbail: picture3,
  },
  {
    id: 4,
    title: "Post 4",
    thumbail: picture4,
  },
  {
    id: 5,
    title: "Post 5",
    thumbail: Picture,
  },
  {
    id: 6,
    title: "Post 6",
    thumbail: picture2,
  },
  {
    id: 7,
    title: "Post 7",
    thumbail: picture3,
  },
  {
    id: 8,
    title: "Post 8",
    thumbail: picture4,
  },
  {
    id: 9,
    title: "Post 9",
    thumbail: Picture,
  },
  {
    id: 10,
    title: "Post 10",
    thumbail: picture2,
  },
  {
    id: 11,
    title: "Post 11",
    thumbail: picture3,
  },
  {
    id: 12,
    title: "Post 12",
    thumbail: picture4,
  },
];

interface LoadingCardProps {
  load: boolean;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ load }) => {
  return (
    <figure>
      <img
        className={`w-full h-[38vh] backdrop-blur-md bg-black`}
        src={Picture}
        alt=""
      />
      <figcaption>
        <h2 className="text-2xl">Loading...</h2>
      </figcaption>
    </figure>
  );
};


interface CardProps {
  thumbail: string;
  title: string;
  load?: boolean,
}

const Card: React.FC<CardProps> = ({ thumbail, title, load }) => {
  return (
    <figure>
      <img className={`w-full h-[38vh] ${load ? "blur-sm bg-black" : ""}`} src={thumbail} alt="" />
      <figcaption>
        <h2 className="text-2xl">{title}</h2>
      </figcaption>
    </figure>
  );
};

const fetchPost = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 6, page * 6);
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
        pages: [posts.slice(0, 6)],
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
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <h1 className="text-2xl">posts:</h1>
      <div className="grid grid-cols-3 gap-5">
        {_posts?.map((post, i) => {
          if (i === _posts.length - 1)
            return (
              <div key={post.id} ref={ref}>
                <Card thumbail={post.thumbail} title={post.title}/>
              </div>
            );
          return (
            <div key={post.id}>
              <Card thumbail={post.thumbail} title={post.title}/>
            </div>
          );
        })}
      </div>

      <div>
        {isFetchingNextPage
          ? 'loader mere...'
          : (data?.pages.length ?? 0) < 3
          ? 'Vis mere'
          : 'ikke flere'}
      </div>
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
