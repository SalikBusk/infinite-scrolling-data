import React, { useEffect, useRef } from "react";

// Components
import Container from "../Components/Container";
import Card from "../Components/Card/Card";

// Data
import posts from "../Data/Data";

// 
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query"; // Importerer komponenter fra react-query biblioteket
import { useIntersection } from "@mantine/hooks"; // Importerer intersections-hook fra mantine/hooks biblioteket
import Heading from "../Components/Heading";





const fetchPost = async (page: number) => {
  // Funktion til at hente indlæg asynkront
  await new Promise((resolve) => setTimeout(resolve, 500));
  return posts.slice((page - 1) * 6, page * 6);
};

const Infinite = () => {
  // Komponent til at vise uendelig rulleliste af indlæg

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam); // Kalder 'fetchPost' funktionen for at hente indlægssider
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1; // Funktion der bestemmer hvilken side der skal hentes næste gang
      },
      initialData: {
        pages: [posts.slice(0, 6)], // Indledende data, her er de første 6 indlæg
        pageParams: [1], // Parameter for første side
      },
    }
  );

  const lastPostRef = useRef<HTMLElement>(null); // Referencen til det sidste indlæg
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1, // Tærskelværdi for synlighed
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage(); // Hvis det sidste indlæg er synligt, hent næste side
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page); // Samler indlæg fra alle hentede sider

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <Container>
        <header className="py-[30px]">
          <Heading title=" Posts:" />
        </header>
        <div className="grid grid-cols-3 gap-5">
          {_posts?.map((post, i) => {
            if (i === _posts.length - 1)
              return (
                <div key={post.id} ref={ref}>
                  <Card thumbail={post.thumbnail} title={post.title} />
                </div>
              );
            return (
              <div key={post.id}>
                <Card thumbail={post.thumbnail} title={post.title} />
              </div>
            );
          })}
        </div>
        {isFetchingNextPage && (
          <div className="py-[10px]">
            <Heading center title="Loader flere"/>
          </div>
        )}
      </Container>
    </div>
  );
};

const queryClient = new QueryClient();

export default function App() {
  // Hovedkomponenten der renderer applikationen
  return (
    <QueryClientProvider client={queryClient}>
      <Infinite />
    </QueryClientProvider>
  );
}
