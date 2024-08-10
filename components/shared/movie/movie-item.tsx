"use client";

import { FavouriteProps, MovieProps } from "@/types";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useGlobalContext } from "@/context";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import CustomImage from "../custom-image";

interface Props {
  movie: MovieProps;
  favouriteId?: string;
  setFavourites?: Dispatch<SetStateAction<FavouriteProps[]>>;
}

const MovieItem: FC<Props> = ({ movie, favouriteId = "", setFavourites }) => {
  const { account, setOpen, setMovie } = useGlobalContext();
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHandlerPopup = () => {
    setMovie(movie);
    setOpen(true);
  };

  const onAdd = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/favourite", {
        uid: session?.user?.uid,
        accountId: account?._id,
        backdrop_path: movie?.backdrop_path,
        poster_path: movie?.poster_path,
        movieId: movie?.id,
        type: movie?.type,
        title: movie?.title || movie?.name,
        overview: movie?.overview,
      });

      if (data?.success)
        return toast({
          title: "Success",
          description: "Movie added to your favourite list",
        });
      else
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
    } catch (e) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/favourite?id=${favouriteId}`);
      if (data?.success) {
        if (setFavourites) {
          setFavourites((prev: FavouriteProps[]) =>
            prev.filter((item: FavouriteProps) => item._id !== favouriteId)
          );
        }
        return toast({
          title: "Success",
          description: "Movie removed from your favourite list",
        });
      } else {
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (e) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <div className="relative cardWrapper mx-1 h-44 min-w-[180px] cursor-pointer md:h-40 md:min-w-[260px] transform transition duration-500 hover:scale-95 hover:z-[99] md:rounded">
        <CustomImage
          image={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt={"Image"}
          className="rounded object-cover"
          onClick={onHandlerPopup}
        />

        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            className={`cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black`}
          >
            {isLoading ? (
              <Loader2 className={"h-7 w-7 animate-spin text-red-600"} />
            ) : favouriteId?.length ? (
              <MinusIcon
                color="#ffffff"
                className="h-7 w-7"
                onClick={onRemove}
              />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" onClick={onAdd} />
            )}
          </button>
          <button className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 ">
            <ChevronDown
              color="#fff"
              className="h-7 w-7"
              onClick={onHandlerPopup}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
