"use client";

import { FC } from "react";
import Navbar from "../Navbar";
import { MovieDataProps } from "@/types";
import Banner from "./banner";
import MovieRow from "@/components/shared/movie/movie-row";
import BottomNavbar from "../BottomNavbar";

interface Props {
  moviesData: MovieDataProps[];
}

const Common: FC<Props> = ({ moviesData }) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="block lg:hidden">
        <BottomNavbar />
      </div>

      <div className={"relative pl-4 pb-20 md:pb-4 lg:space-y-24"}>
        <Banner movies={moviesData && moviesData[0].data} />

        <section className={"md:space-y-16"}>
          {Array.isArray(moviesData) &&
            moviesData.map((movie) => (
              <MovieRow
                title={movie.title}
                data={movie.data}
                key={movie.title}
              />
            ))}
        </section>
      </div>
    </main>
  );
};

export default Common;
