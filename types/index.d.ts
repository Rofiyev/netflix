export interface ContextType {
  account: IAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
  pageLoader: boolean;
  setPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  movie: MovieProps | null;
  setMovie: React.Dispatch<React.SetStateAction<MovieProps | null>>;
}

export interface IAccount {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}

export interface ChildProps {
  children: React.ReactNode;
}

export interface AxiosResponse {
  success: boolean;
  data?: IAccount[];
  message: string;
}

export interface AccountResponse extends AxiosResponse {
  data?: IAccount[] | IAccount;
}

export interface IMenuItem {
  id: string;
  name: string;
  route: string;
}

export interface MovieDataProps {
  title: string;
  data: MovieProps[];
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  type: string;
  vote_average: number;
  vote_count: number;
  title: string;
  addedToFavorites: boolean;
  movieID: number;
}

export interface MovieDetailsProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Array<any>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<any>;
  production_countries: Array<any>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<any>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: VideoProps[];
  };
  vote_average: number;
  vote_count: number;
}

export interface VideoProps {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface FavouriteProps {
  uid: string;
  accountId: string;
  backdrop_path: string;
  poster_path: string;
  movieId: string;
  type: string;
  title: string;
  overview: string;
  _id?: string;
}
