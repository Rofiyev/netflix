"use client";

import { MovieProps } from "@/types";
import MovieItem from "@/components/shared/movie/movie-item";
import Slider from "react-slick";
import { settings } from "@/constants";
// Slick Carousel CSS file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  title: string;
  data: MovieProps[];
}

const MovieRow = ({ title, data }: Props) => {
  return (
    <div className={"h-40 space-y-0.5 md:space-y-2 px-4"}>
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className={"group relative md:-ml-2"}>
        <Slider
          {...settings}
          className={
            "flex items-center gap-2 scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
          }
        >
          {data &&
            data
              .filter(
                (item) =>
                  item.backdrop_path !== null && item.poster_path !== null
              )
              .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </Slider>
      </div>
    </div>
  );
};

export default MovieRow;
