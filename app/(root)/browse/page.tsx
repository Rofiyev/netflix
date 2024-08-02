"use client";

import { useEffect, useState } from "react";
import Common from "@/components/shared/common";
import LoaderPage from "@/components/shared/loader";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getFavourites,
} from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";

const BrowsePage = () => {
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [
          trendingMovies,
          topRatedMovies,
          popularMovies,
          trendingTv,
          topRatedTv,
          popularTv,
          favorites,
        ] = await Promise.all([
          getTrendingMovies("movie"),
          getTopRatedMovies("movie"),
          getPopularMovies("movie"),
          getTrendingMovies("tv"),
          getTopRatedMovies("tv"),
          getPopularMovies("tv"),
          getFavourites(session?.user?.uid, account?._id!),
        ]);

        const tvShows: MovieDataProps[] = [
          { title: "Trending TV Shows", data: trendingTv },
          { title: "Top Rated TV Shows", data: topRatedTv },
          { title: "Popular TV Shows", data: popularTv },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "tv",
            addedToFavorites: false,
          })),
        }));

        const moviesShows: MovieDataProps[] = [
          { title: "Trending Movies", data: trendingMovies },
          { title: "Top Rated Movies", data: topRatedMovies },
          { title: "Popular Movies", data: popularMovies },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "movie",
            addedToFavorites: false,
          })),
        }));

        const allMovies = [...moviesShows, ...tvShows];
        setMoviesData(allMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [session]);

  if (!session) return <Login />;
  if (!account) return <ManageAccount />;
  if (pageLoader) return <LoaderPage />;

  return <Common moviesData={moviesData} />;
};

export default BrowsePage;
