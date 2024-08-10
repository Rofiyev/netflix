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
    <div className={"sm:h-40 space-y-0.5 md:space-y-2 sm:px-4 mb-4"}>
      <h2 className="cursor-pointer text-xl font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className={"relative md:-ml-2"}>
        <Slider
          {...settings}
          className={
            "flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-5 md:p-2"
          }
        >
          {Array.isArray(data) &&
            data
              .filter(
                (item: MovieProps) =>
                  item.backdrop_path !== null && item.poster_path !== null
              )
              .map((movie: MovieProps) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieRow;
