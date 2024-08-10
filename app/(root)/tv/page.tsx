"use client";

import Common from "@/components/shared/common";
import LoaderPage from "@/components/shared/loader";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context";
import { getMoviesByGenre } from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          action,
          animation,
          comedy,
          crime,
          documentary,
          drama,
          family,
          war,
        ] = await Promise.all([
          getMoviesByGenre("tv", 10759),
          getMoviesByGenre("tv", 16),
          getMoviesByGenre("tv", 35),
          getMoviesByGenre("tv", 80),
          getMoviesByGenre("tv", 99),
          getMoviesByGenre("tv", 18),
          getMoviesByGenre("tv", 10751),
          getMoviesByGenre("tv", 10768),
        ]);

        const allResult: MovieDataProps[] = [
          { title: "Action", data: action },
          { title: "Animation", data: animation },
          { title: "Comedy", data: comedy },
          { title: "Crime", data: crime },
          { title: "Documentary", data: documentary },
          { title: "Drama", data: drama },
          { title: "Family", data: family },
          { title: "War", data: war },
        ].map((item: MovieDataProps) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "tv",
            addedToFavorites: false,
          })),
        }));

        setMoviesData(allResult);
      } catch (e) {
        console.log(e);
      } finally {
        setPageLoader(false);
      }
    };

    getAllMovies();
  }, []);

  if (!session) return <Login />;
  if (!account) return <ManageAccount />;
  if (pageLoader) return <LoaderPage />;

  return <Common moviesData={moviesData} />;
};
export default Page;
